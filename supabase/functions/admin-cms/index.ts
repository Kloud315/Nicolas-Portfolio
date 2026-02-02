import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-token',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

async function verifyAdminSession(supabase: any, token: string): Promise<boolean> {
  if (!token) return false;
  
  const { data: session, error } = await supabase
    .from('admin_sessions')
    .select('id, expires_at')
    .eq('token', token)
    .single();

  if (error || !session) return false;
  if (new Date(session.expires_at) < new Date()) {
    await supabase.from('admin_sessions').delete().eq('id', session.id);
    return false;
  }
  return true;
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
    const pathParts = url.pathname.split('/').filter(Boolean);
    const resource = pathParts[pathParts.length - 1];
    const method = req.method;

    // Verify admin token for all requests
    const adminToken = req.headers.get('x-admin-token');
    console.log(
      JSON.stringify({
        at: 'admin-cms',
        method,
        pathname: url.pathname,
        resource,
        hasAdminToken: !!adminToken,
      })
    );

    const isValid = await verifyAdminSession(supabase, adminToken || '');
    
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle different resources
    const tables = [
      'hero_content', 'about_content', 'skill_categories', 'skills',
      'projects', 'achievements', 'leadership_content', 'contact_info', 'site_settings'
    ];

    // Tables that have sort_order column
    const tablesWithSortOrder = ['skill_categories', 'skills', 'projects', 'achievements'];

    if (!tables.includes(resource)) {
      return new Response(
        JSON.stringify({ error: 'Invalid resource' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (method === 'GET') {
      let query = supabase.from(resource).select('*');
      
      // Only apply sort_order for tables that have it
      if (tablesWithSortOrder.includes(resource)) {
        query = query.order('sort_order', { ascending: true });
      }
      
      const { data, error } = await query;

      if (error) throw error;

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (method === 'POST') {
      const body = await req.json();
      const { data, error } = await supabase
        .from(resource)
        .insert(body)
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ data }),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (method === 'PUT') {
      const body = await req.json();
      const { id, ...updateData } = body;

      if (!id) {
        return new Response(
          JSON.stringify({ error: 'ID is required for update' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data, error } = await supabase
        .from(resource)
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (method === 'DELETE') {
      const { id } = await req.json();

      if (!id) {
        return new Response(
          JSON.stringify({ error: 'ID is required for delete' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { error } = await supabase
        .from(resource)
        .delete()
        .eq('id', id);

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('CMS error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
