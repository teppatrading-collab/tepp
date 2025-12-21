// 🔒 PREVENT DOUBLE SUPABASE INIT
if (!window._supabaseClient) {
  window._supabaseClient = window.supabase.createClient(
    'https://xuifnaypkeeukyjvlapi.supabase.co',
    'sb_publishable_44vXTyFg__8x2Ohqa8KGuA_OV9HX2ob'
  )
}

const supabase = window._supabaseClient
let mode = 'login'

// BUTTON EVENTS
document.getElementById('loginBtn').onclick = () => openAuth('login')
document.getElementById('signupBtn').onclick = () => openAuth('signup')
document.getElementById('logoutBtn').onclick = logout
document.getElementById('submitAuth').onclick = handleAuth
document.getElementById('closeModal').onclick = closeAuth

function openAuth(type) {
  mode = type
  document.getElementById('authTitle').innerText =
    type === 'login' ? 'Login' : 'Sign Up'
  document.getElementById('authModal').classList.remove('hidden')
}

function closeAuth() {
  document.getElementById('authModal').classList.add('hidden')
}

async function handleAuth() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  if (!email || !password) {
    alert('Enter email and password')
    return
  }

  const result =
    mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

  if (result.error) {
    alert(result.error.message)
    return
  }

  alert(mode === 'login' ? 'Logged in!' : 'Check your email to confirm signup')
  closeAuth()
  updateUI(true)
}

async function logout() {
  await supabase.auth.signOut()
  updateUI(false)
}

function updateUI(loggedIn) {
  document.getElementById('loginBtn').classList.toggle('hidden', loggedIn)
  document.getElementById('signupBtn').classList.toggle('hidden', loggedIn)
  document.getElementById('logoutBtn').classList.toggle('hidden', !loggedIn)
}

// SESSION CHECK
supabase.auth.getSession().then(({ data }) => {
  updateUI(!!data.session)
})
