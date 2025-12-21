const supabaseUrl = "https://xuifnaypkeeukyjvlapi.supabase.co";
const supabaseKey = "sb_publishable_44vXTyFg__8x2Ohqa8KGuA_OV9HX2ob";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let mode = "login";

function openAuth(type) {
  mode = type;
  document.getElementById("authTitle").innerText =
    type === "login" ? "Login" : "Sign Up";
  document.getElementById("authModal").classList.remove("hidden");
}

function closeAuth() {
  document.getElementById("authModal").classList.add("hidden");
}

async function handleAuth() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let result;
  if (mode === "login") {
    result = await supabase.auth.signInWithPassword({ email, password });
  } else {
    result = await supabase.auth.signUp({ email, password });
  }

  if (result.error) {
    alert(result.error.message);
  } else {
    alert("Success!");
    closeAuth();
    checkUser();
  }
}

async function logout() {
  await supabase.auth.signOut();
  checkUser();
}

async function checkUser() {
  const { data } = await supabase.auth.getUser();
  document.getElementById("logoutBtn").classList.toggle("hidden", !data.user);
}

checkUser();
