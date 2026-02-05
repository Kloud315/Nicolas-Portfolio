 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
 interface ContactRequest {
   name: string;
   email: string;
   subject: string;
   message: string;
 }
 
 const handler = async (req: Request): Promise<Response> => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const { name, email, subject, message }: ContactRequest = await req.json();
 
     // Validate required fields
     if (!name || !email || !subject || !message) {
       return new Response(
         JSON.stringify({ error: "All fields are required" }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     // Validate email format
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
       return new Response(
         JSON.stringify({ error: "Invalid email format" }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     // Validate field lengths
     if (name.length > 100 || email.length > 255 || subject.length > 200 || message.length > 5000) {
       return new Response(
         JSON.stringify({ error: "Field length exceeds maximum allowed" }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     console.log("Sending contact email from:", name, email);
 
   const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
   if (!RESEND_API_KEY) {
     return new Response(
       JSON.stringify({ error: "Email service not configured" }),
       { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   }
 
   const emailResponse = await fetch("https://api.resend.com/emails", {
     method: "POST",
     headers: {
       "Authorization": `Bearer ${RESEND_API_KEY}`,
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       from: "Portfolio Contact <onboarding@resend.dev>",
       to: ["johnpatricknicolas15@gmail.com"],
       subject: `Portfolio Contact: ${subject}`,
       reply_to: email,
       html: `
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
           <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
             New Contact Form Submission
           </h2>
           
           <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
             <p style="margin: 0 0 10px 0;">
               <strong style="color: #6366f1;">From:</strong> ${name}
             </p>
             <p style="margin: 0 0 10px 0;">
               <strong style="color: #6366f1;">Email:</strong> 
               <a href="mailto:${email}" style="color: #333;">${email}</a>
             </p>
             <p style="margin: 0;">
               <strong style="color: #6366f1;">Subject:</strong> ${subject}
             </p>
           </div>
           
           <div style="background: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
             <h3 style="color: #333; margin-top: 0;">Message:</h3>
             <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
           </div>
           
           <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">
             This message was sent from your portfolio contact form.
           </p>
         </div>
       `,
     }),
   });
 
   if (!emailResponse.ok) {
     const errorData = await emailResponse.text();
     console.error("Resend API error:", errorData);
     return new Response(
       JSON.stringify({ error: "Failed to send email" }),
       { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   }
 
   const responseData = await emailResponse.json();
   console.log("Email sent successfully:", responseData);
 
     return new Response(
       JSON.stringify({ success: true, message: "Email sent successfully" }),
       { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   } catch (error: any) {
     console.error("Error sending contact email:", error);
     return new Response(
       JSON.stringify({ error: error.message || "Failed to send email" }),
       { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   }
 };
 
 serve(handler);