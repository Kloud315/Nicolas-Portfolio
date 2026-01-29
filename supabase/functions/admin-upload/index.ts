import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-token',
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

    // Verify admin token
    const adminToken = req.headers.get('x-admin-token');
    const isValid = await verifyAdminSession(supabase, adminToken || '');
    
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'resume' or 'profile' or 'project'

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate unique filename
    const ext = file.name.split('.').pop();
    const filename = `${type}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(filename, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return new Response(
        JSON.stringify({ error: 'Failed to upload file' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('portfolio-assets')
      .getPublicUrl(filename);

    // If it's a resume or profile image, update site_settings
    if (type === 'resume' || type === 'profile') {
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .single();

      const updateField = type === 'resume' ? 'resume_url' : 'profile_image_url';
      
      if (existing) {
        await supabase
          .from('site_settings')
          .update({ [updateField]: urlData.publicUrl })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('site_settings')
          .insert({ [updateField]: urlData.publicUrl });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        url: urlData.publicUrl,
        path: filename 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
