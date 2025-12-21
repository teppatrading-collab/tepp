import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xuifnaypkeeukyjvlapi.supabase.co'

const supabaseAnonKey = 'sb_publishable_44vXTyFg__8x2Ohqa8KGuA_OV9HX2ob'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
