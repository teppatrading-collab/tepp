// Supabase setup (ONLY HERE)
const supabaseUrl = 'https://xuifnaypkeeukyjvlapi.supabase.co'
const supabaseKey = 'sb_publishable_44vXTyFg__8x2Ohqa8KGuA_OV9HX2ob'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

let mode = 'login'

// Button bindings
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

  let result
  if (mode === 'login') {
    result = await supabase.auth.signInWithPassword({ email, password })
  } else {
    result = await supabase.auth.signUp({ email, password })
  }

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

// Session check
supabase.auth.getSession().then(({ data }) => {
  updateUI(!!data.session)
})
