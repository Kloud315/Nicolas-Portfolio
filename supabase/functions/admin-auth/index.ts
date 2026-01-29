import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { encode as base64Encode } from 'https://deno.land/std@0.208.0/encoding/base64.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple bcrypt-like hash comparison using Web Crypto API
async function hashPassword(password: string, salt?: string): Promise<{ hash: string; salt: string }> {
  const actualSalt = salt || crypto.randomUUID();
  const encoder = new TextEncoder();
  const data = encoder.encode(password + actualSalt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return { hash: `${actualSalt}:${hashHex}`, salt: actualSalt };
}

async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;
  const { hash: computedHash } = await hashPassword(password, salt);
  const [, computedHashValue] = computedHash.split(':');
  return hash === computedHashValue;
}

function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return base64Encode(bytes);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const url = new URL(req.url);
    const action = url.pathname.split('/').pop();

    if (action === 'login' && req.method === 'POST') {
      const { username, password } = await req.json();

      if (!username || !password) {
        return new Response(
          JSON.stringify({ error: 'Username and password are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get admin user (using service role to bypass RLS)
      const { data: adminUser, error: userError } = await supabase
        .from('admin_users')
        .select('id, username, password_hash')
        .eq('username', username)
        .single();

      if (userError || !adminUser) {
        console.log('User not found:', username);
        return new Response(
          JSON.stringify({ error: 'Invalid credentials' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify password
      const isValid = await verifyPassword(password, adminUser.password_hash);
      if (!isValid) {
        console.log('Invalid password for user:', username);
        return new Response(
          JSON.stringify({ error: 'Invalid credentials' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create session token
      const token = generateSessionToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Clean up old sessions for this user
      await supabase
        .from('admin_sessions')
        .delete()
        .eq('admin_user_id', adminUser.id);

      // Create new session
      const { error: sessionError } = await supabase
        .from('admin_sessions')
        .insert({
          admin_user_id: adminUser.id,
          token,
          expires_at: expiresAt.toISOString(),
        });

      if (sessionError) {
        console.error('Session creation error:', sessionError);
        return new Response(
          JSON.stringify({ error: 'Failed to create session' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          token,
          expiresAt: expiresAt.toISOString(),
          username: adminUser.username 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'verify' && req.method === 'POST') {
      const { token } = await req.json();

      if (!token) {
        return new Response(
          JSON.stringify({ valid: false }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: session, error } = await supabase
        .from('admin_sessions')
        .select('id, expires_at, admin_user_id, admin_users(username)')
        .eq('token', token)
        .single();

      if (error || !session) {
        return new Response(
          JSON.stringify({ valid: false }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if session has expired
      if (new Date(session.expires_at) < new Date()) {
        // Delete expired session
        await supabase.from('admin_sessions').delete().eq('id', session.id);
        return new Response(
          JSON.stringify({ valid: false }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          valid: true, 
          username: (session.admin_users as any)?.username 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'logout' && req.method === 'POST') {
      const { token } = await req.json();

      if (token) {
        await supabase.from('admin_sessions').delete().eq('token', token);
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'setup' && req.method === 'POST') {
      // Check if admin user already exists
      const { data: existing } = await supabase
        .from('admin_users')
        .select('id')
        .limit(1);

      if (existing && existing.length > 0) {
        return new Response(
          JSON.stringify({ error: 'Admin user already exists' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create default admin user with hashed password
      const { hash } = await hashPassword('151515');
      
      const { error } = await supabase
        .from('admin_users')
        .insert({
          username: 'johnpatricknicolas',
          password_hash: hash,
        });

      if (error) {
        console.error('Admin setup error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to create admin user' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Admin user created' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Admin auth error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
