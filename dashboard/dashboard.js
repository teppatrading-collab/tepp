const supabaseClient = window.supabase.createClient(
  "https://xuifnaypkeeukyjlapi.supabase.co",
  "sb_publishable_44vXTyFg_8x20hqa8KGuA_0V9HX2ob"
);

(async () => {
  const { data, error } = await supabaseClient.auth.getSession();

  if (!data.session) {
    window.location.href = "/index.html";
    return;
  }

  document.getElementById("userEmail").innerText =
    data.session.user.email;
})();

document.getElementById("logout").onclick = async () => {
  await supabaseClient.auth.signOut();
  window.location.href = "/index.html";
};
