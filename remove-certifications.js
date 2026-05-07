// Temporary script to remove certifications from achievements table
// Run this once with: node remove-certifications.js

const { createClient } = require('@supabase/supabase-js');

// You'll need to get these values from your .env file or Supabase dashboard
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function removeCertifications() {
  const certificationsToRemove = [
    'IT Specialist - Database',
    'IT Specialist - HTML & CSS', 
    'CCNA: Introduction to Networks',
    'Certified Cloud System Analyst',
    'Google AI Essentials',
    'Google Prompting Essentials'
  ];

  try {
    console.log('Removing certifications from achievements table...');
    
    const { data, error } = await supabase
      .from('achievements')
      .delete()
      .in('title', certificationsToRemove);

    if (error) {
      console.error('Error removing certifications:', error);
      return;
    }

    console.log('Successfully removed certifications:', data);
    console.log('Done! You can now delete this file.');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

removeCertifications();
