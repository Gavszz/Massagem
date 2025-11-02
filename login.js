import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.querySelector('input[name="email"]').value;
  const senha = form.querySelector('input[name="senha"]').value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    alert("✅ Login realizado com sucesso!");
    window.location.href = "index.html";
  } catch (error) {
    alert("❌ Erro ao fazer login: " + error.message);
  }
});
