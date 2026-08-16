import { supabase } from './supabaseClient.js'

async function probar() {
  const { data, error } = await supabase.from('muebles').select('*').limit(1)
  if (error) {
    console.log('Error de conexión:', error.message)
  } else {
    console.log('¡Conexión exitosa con Supabase! Datos:', data)
  }
}

probar()