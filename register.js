import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(userCredential.user, { displayName: nome });

    alert("✅ Cadastro realizado com sucesso!");
    window.location.href = "index.html";
  } catch (error) {
    alert("❌ Erro ao cadastrar: " + error.message);
  }
});
