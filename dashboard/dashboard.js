const email = localStorage.getItem("userEmail");

if (!email) {
  window.location.href = "/index.html";
}

document.getElementById("userEmail").innerText = email;

document.getElementById("logout").onclick = () => {
  localStorage.clear();
  window.location.href = "/index.html";
};
