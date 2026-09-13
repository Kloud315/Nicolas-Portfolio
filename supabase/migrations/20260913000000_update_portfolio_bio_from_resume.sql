UPDATE public.about_content
SET
  content = '<p>As an <span class="text-foreground font-medium">AI Full Stack Engineer and Magna Cum Laude BSIT graduate</span> from Lyceum of the Philippines University – Cavite, I graduated on August 19, 2026. As a <span class="text-primary font-medium">DOST-SEI Scholar</span> with a GWA of 1.33, I combine academic excellence with <span class="text-foreground font-medium">430+ hours of verified production engineering experience</span>.</p><p>My expertise spans the full development lifecycle, from architecting scalable systems to deploying AI-integrated solutions that serve real users. At StartupLab Business Center & AI Consulting Agency OPC, I built <span class="text-foreground font-medium">12+ live HRIS modules</span>, led 11 consecutive weeks of Agile sprints as Scrum Master, deployed with GitHub Actions CI/CD, and implemented multi-tenant data isolation.</p><p>My technical foundation includes <span class="text-primary font-medium">Laravel, React, TypeScript, Inertia.js, Next.js, Node.js, PostgreSQL, Prisma, Redis, Docker, and AI integrations</span>. I also lead the development of GameSchedGo for the City Government of Trece Martires and build a five-branch business system for Chibis Food Store covering attendance, payroll, inventory, and POS.</p><p>I am focused on <span class="text-foreground font-medium">AI-powered full-stack systems, government and enterprise software, business operations technology, and startup product innovation</span>.</p>',
  gwa = '1.33'
WHERE content IS NOT NULL;

UPDATE public.leadership_content
SET
  title = 'Leadership & Technical Mindset',
  description = 'Strategic, decisive, and execution-focused leadership grounded in Agile delivery, technical depth, and entrepreneurial drive.',
  traits = '[{"icon":"Brain","title":"AI-First Development","description":"Integrating artificial intelligence into production systems for enhanced capabilities"},{"icon":"Code","title":"Full-Stack Architecture","description":"Building scalable, end-to-end solutions with modern technology stacks and best practices"},{"icon":"Users","title":"Technical Leadership","description":"Leading development teams with Agile methodologies and strategic technical decisions"}]'::jsonb
WHERE id IS NOT NULL;
