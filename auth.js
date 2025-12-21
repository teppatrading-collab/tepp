// =======================
// SUPABASE SETUP (ONLY ONCE)
// =======================
const SUPABASE_URL = 'https://xuifnaypkeeukyjvlapi.supabase.co'
const SUPABASE_KEY = 'sb_publishable_44vXTyFg__8x2Ohqa8KGuA_OV9HX2ob'

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

let mode = 'login'

// =======================
// MODAL CONTROLS
// =======================
function openAuth(type) {
  mode = type
  document.getElementById('authTitle').innerText =
    type === 'login' ? 'Login' : 'Sign Up'
  document.getElementById('authModal').classList.remove('hidden')
}

function closeAuth() {
  document.getElementById('authModal').classList.add('hidden')
}

// =======================
// AUTH HANDLER
// =======================
async function handleAuth() {
  const email = document.getElementById('email').value.trim()
  const password = document.getElementById('password').value.trim()

  if (!email || !password) {
    alert('Enter email and password')
    return
  }

  let result
  if (mode === 'login') {
    result = await supabaseClient.auth.signInWithPassword({
      email,
      password
    })
  } else {
    result = await supabaseClient.auth.signUp({
      email,
      password
    })
  }

  if (result.error) {
    alert(result.error.message)
    return
  }

  alert(mode === 'login' ? 'Logged in!' : 'Signup successful!')
  closeAuth()
  updateUI(true)
}

// =======================
// LOGOUT
// =======================
async function logout() {
  await supabaseClient.auth.signOut()
  updateUI(false)
}

// =======================
// UI STATE
// =======================
function updateUI(loggedIn) {
  document.getElementById('loginBtn').classList.toggle('hidden', loggedIn)
  document.getElementById('signupBtn').classList.toggle('hidden', loggedIn)
  document.getElementById('logoutBtn').classList.toggle('hidden', !loggedIn)
}

// =======================
// EVENT BINDINGS (CRITICAL)
// =======================
document.getElementById('loginBtn').onclick = () => openAuth('login')
document.getElementById('signupBtn').onclick = () => openAuth('signup')
document.getElementById('logoutBtn').onclick = logout
document.getElementById('submitAuth').onclick = handleAuth
document.getElementById('closeModal').onclick = closeAuth

// =======================
// SESSION CHECK
// =======================
supabaseClient.auth.getSession().then(({ data }) => {
  updateUI(!!data.session)
})
