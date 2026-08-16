import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mpytcmxacfbrzhwcosd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1weXRjbXhhY2Zicnpocndjb3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3OTA2NDUsImV4cCI6MjEwMjM2NjY0NX0.ftrNUP3I8lU5MUdJSX9PbVSDR5FfkvaQXuhfEr_AN6U'

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  console.log('Conectando a Supabase...');
  const { data, error } = await supabase.from('products').select('*')
  console.log('Datos:', data)
  console.log('Error:', error)
}

test()