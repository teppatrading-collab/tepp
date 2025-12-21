// ✅ USE EXISTING SUPABASE FROM CDN
const supabase = window.supabase.createClient(
  'https://xuifnaypkeeukyjvlapi.supabase.co',
  'sb_publishable_44vXTyFg__8x2Ohqa8KGuA_OV9HX2ob'
)

let mode = 'login'

// ------------------ MODAL CONTROLS ------------------
window.openAuth = function(type) {
  mode = type
  document.getElementById('authTitle').innerText =
    type === 'login' ? 'Login' : 'Sign Up'
  document.getElementById('authModal').classList.remove('hidden')
}

window.closeAuth = function() {
  document.getElementById('authModal').classList.add('hidden')
}

// ------------------ AUTH HANDLER ------------------
window.handleAuth = async function () {
  const email = document.getElementById('email').value.trim()
  const password = document.getElementById('password').value.trim()

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

  alert(mode === 'login' ? 'Logged in!' : 'Signup successful!')
  closeAuth()
  updateUI(true)
}

// ------------------ LOGOUT ------------------
window.logout = async function () {
  await supabase.auth.signOut()
  updateUI(false)
}

// ------------------ UI STATE ------------------
function updateUI(loggedIn) {
  document.getElementById('loginBtn').classList.toggle('hidden', loggedIn)
  document.getElementById('signupBtn').classList.toggle('hidden', loggedIn)
  document.getElementById('logoutBtn').classList.toggle('hidden', !loggedIn)
}

// ------------------ EVENT BINDINGS ------------------
document.getElementById('loginBtn').onclick = () => openAuth('login')
document.getElementById('signupBtn').onclick = () => openAuth('signup')
document.getElementById('logoutBtn').onclick = logout
document.getElementById('submitAuth').onclick = handleAuth
document.getElementById('closeModal').onclick = closeAuth

// ------------------ SESSION CHECK ------------------
supabase.auth.getSession().then(({ data }) => {
  updateUI(!!data.session)
})
