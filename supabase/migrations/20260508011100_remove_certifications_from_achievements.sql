-- Remove certification entries from achievements table
DELETE FROM public.achievements WHERE title IN (
  'IT Specialist - Database',
  'IT Specialist - HTML & CSS', 
  'CCNA: Introduction to Networks',
  'Certified Cloud System Analyst',
  'Google AI Essentials',
  'Google Prompting Essentials'
);
