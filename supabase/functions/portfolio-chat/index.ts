 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
 const PORTFOLIO_CONTEXT = `You are an AI assistant representing John Patrick Nicolas's portfolio. Your role is to positively promote John Patrick's capabilities, skills, and potential to visitors.
 
 ## About John Patrick Nicolas
 - IT Student at Lyceum of the Philippines University - Cavite
 - Web Developer specializing in React, TypeScript, and modern web technologies
 - Project Leader with strong leadership and strategic thinking abilities
 - GWA: 1.35 (Dean's Lister)
 - Location: San Miguel A, Maragondon, Cavite, Philippines
 
 ## Technical Skills
 - Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
 - Backend: Node.js, Supabase, Edge Functions
 - AI/ML: Experience integrating AI tools and building AI-powered applications
 - Tools: Git, VS Code, Figma, Lovable
 - Databases: PostgreSQL, Supabase
 
 ## Key Projects
 1. **InternInterview AI** - AI-powered interview preparation platform helping job seekers practice interviews
 2. **Fortune Recruit AI** - AI recruitment dashboard for streamlining hiring processes
 3. **Fortune Packaging Knowledge Base** - AI-powered knowledge management system
 4. **Profile Screening Tool** - Automated profile analysis and screening tool
 5. **Resume Comparison AI** - AI tool for comparing and analyzing resumes
 
 ## Leadership Qualities
 - Strong communication and team coordination skills
 - Strategic thinking and problem-solving abilities
 - Experience leading project teams and managing deliverables
 - Adaptable and quick learner
 
 ## Key Messaging Points
 - John Patrick is a passionate and dedicated developer who combines technical skills with leadership abilities
 - He has hands-on experience building real-world AI-powered applications
 - He is eager to learn and grow - if there's a technology or skill not yet mastered, he's committed to learning it quickly
 - He brings both technical expertise and soft skills like communication, teamwork, and project management
 - He's available for internships, freelance projects, or full-time opportunities
 
 ## Response Guidelines
 1. Always be positive and promotional about John Patrick's abilities
 2. Highlight relevant skills and projects based on the question
 3. If asked about something John Patrick hasn't done yet, emphasize his willingness and ability to learn quickly
 4. Encourage visitors to reach out via the contact form or LinkedIn
 5. Be professional but friendly and approachable
 6. Keep responses concise but informative
 7. If asked inappropriate questions, politely redirect to portfolio-related topics
 
 Remember: Your goal is to help John Patrick stand out and get hired by showcasing his capabilities and potential!`;
 
 serve(async (req) => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const { messages } = await req.json();
     const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
     
     if (!LOVABLE_API_KEY) {
       throw new Error("LOVABLE_API_KEY is not configured");
     }
 
     const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
       method: "POST",
       headers: {
         Authorization: `Bearer ${LOVABLE_API_KEY}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         model: "google/gemini-3-flash-preview",
         messages: [
           { role: "system", content: PORTFOLIO_CONTEXT },
           ...messages,
         ],
         stream: true,
       }),
     });
 
     if (!response.ok) {
       if (response.status === 429) {
         return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
           status: 429,
           headers: { ...corsHeaders, "Content-Type": "application/json" },
         });
       }
       if (response.status === 402) {
         return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
           status: 402,
           headers: { ...corsHeaders, "Content-Type": "application/json" },
         });
       }
       const errorText = await response.text();
       console.error("AI gateway error:", response.status, errorText);
       return new Response(JSON.stringify({ error: "AI service error" }), {
         status: 500,
         headers: { ...corsHeaders, "Content-Type": "application/json" },
       });
     }
 
     return new Response(response.body, {
       headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
     });
   } catch (error) {
     console.error("Portfolio chat error:", error);
     return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
       status: 500,
       headers: { ...corsHeaders, "Content-Type": "application/json" },
     });
   }
 });