// Supabase setup
const supabaseUrl = 'https://xuifnaypkeeukyjvlapi.supabase.co'
const supabaseKey = 'sb_publishable_44vXTyFg__8x2Ohqa8KGuA_OV9HX2ob'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

let mode = 'login'

// Open modal
window.openAuth = function(type) {
  mode = type
  document.getElementById('authTitle').innerText =
    type === 'login' ? 'Login' : 'Sign Up'
  document.getElementById('authModal').classList.remove('hidden')
}

// Close modal
window.closeAuth = function() {
  document.getElementById('authModal').classList.add('hidden')
}

// Login / Signup
window.handleAuth = async function () {
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

  alert(mode === 'login' ? 'Logged in!' : 'Signup successful!')
  closeAuth()
  updateUI(true)
}

// Logout
window.logout = async function () {
  await supabase.auth.signOut()
  updateUI(false)
}

// Update buttons
function updateUI(loggedIn) {
  document.getElementById('loginBtn').classList.toggle('hidden', loggedIn)
  document.getElementById('signupBtn').classList.toggle('hidden', loggedIn)
  document.getElementById('logoutBtn').classList.toggle('hidden', !loggedIn)
}

// Check session on load
supabase.auth.getSession().then(({ data }) => {
  updateUI(!!data.session)
})
