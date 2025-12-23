const email = localStorage.getItem("userEmail");

if (!email) {
  window.location.href = "/index.html";
}

document.getElementById("userEmail").innerText = email;

document.getElementById("logout").onclick = () => {
  localStorage.removeItem("userEmail");
  window.location.href = "/index.html";
};
