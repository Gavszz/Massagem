import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const userInfo = document.getElementById("userInfo");
const configIcon = document.getElementById("configIcon");
const configMenu = document.getElementById("configMenu");
const displayNameSpan = document.getElementById("displayName");
const displayEmailSpan = document.getElementById("displayEmail");

function showLoggedOutUI() {
  userInfo.style.display = "flex";
  configIcon.style.display = "none";
  configMenu.style.display = "none";
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.style.display = "none";
    configIcon.style.display = "block";

    displayNameSpan.textContent = user.displayName || "(Sem nome)";
    displayEmailSpan.textContent = user.email;

    configIcon.onclick = () => configMenu.style.display = "block";
    document.getElementById("closeConfigMenu").onclick = () => configMenu.style.display = "none";
    document.getElementById("openConfigPage").onclick = () => window.location.href = "configuracoes.html";

    document.getElementById("logoutBtn").onclick = async () => {
      await signOut(auth);
      showLoggedOutUI();
    };
  } else {
    showLoggedOutUI();
  }
});
