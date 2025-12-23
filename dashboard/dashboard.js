// PROTECT DASHBOARD
const user = localStorage.getItem("userEmail");

if (!user) {
  window.location.href = "/login.html";
}

document.getElementById("userEmail").innerText = user;

// LOGOUT
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("userEmail");
  window.location.href = "/";
});
