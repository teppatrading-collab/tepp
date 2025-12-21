// =======================
// SUPABASE SETUP
// =======================
const SUPABASE_URL = 'https://xuifnaypkeeukyjvlapi.supabase.co'
const SUPABASE_KEY = 'sb_publishable_44vXTyFg__8x2Ohqa8KGuA_OV9HX2ob'

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

// =======================
// APPLY HANDLER
// =======================
document.getElementById('applyBtn').onclick = async () => {
  const name = document.getElementById('name').value.trim()
  const email = document.getElementById('email').value.trim()
  const experience = document.getElementById('experience').value.trim()
  const goals = document.getElementById('goals').value.trim()

  if (!name || !email || !experience || !goals) {
    alert('Please fill out all fields')
    return
  }

  const { error } = await supabaseClient
    .from('applications')
    .insert([
      { name, email, experience, goals }
    ])

  if (error) {
    alert(error.message)
    return
  }

  alert('Application submitted successfully!')
  window.location.href = 'index.html'
}
