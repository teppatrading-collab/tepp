// ===============================
// SUPABASE INIT (ONE TIME ONLY)
// ===============================
const supabaseClient = window.supabase.createClient(
  "https://xuifnaypkeeukyjlapi.supabase.co",
  "sb_publishable_44vXTyFg_8x20hqa8KGuA_0V9HX2ob"
);

// ===============================
// WAIT FOR AUTH STATE (CRITICAL)
// ===============================
supabaseClient.auth.onAuthStateChange((event, session) => {
  // ❌ NOT LOGGED IN → GO HOME
  if (!session) {
    window.location.replace("/index.html");
    return;
  }

  // ✅ LOGGED IN → SHOW DASHBOARD
  document.getElementById("userEmail").innerText =
    session.user.email;
});

// ===============================
// LOGOUT
// ===============================
document.getElementById("logout").onclick = async () => {
  await supabaseClient.auth.signOut();
  window.location.replace("/index.html");
};
