import { auth } from "./firebase.js";
import {
  updateProfile,
  updatePassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  verifyBeforeUpdateEmail
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Seletores
const form = document.getElementById("configForm");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const senhaAtualInput = document.getElementById("senhaAtual");
const novaSenhaInput = document.getElementById("novaSenha");
const voltarBtn = document.getElementById("voltarBtn");

let currentUser = null;

// 🔹 Verifica se o usuário está logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    nomeInput.value = user.displayName || "";
    emailInput.value = user.email || "";
  } else {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "login.html";
  }
});

// 🔹 Envio do formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const senhaAtual = senhaAtualInput.value;
  if (!senhaAtual) return alert("Digite sua senha atual para alterar os dados.");

  try {
    // 1️⃣ Reautentica o usuário
    const credential = EmailAuthProvider.credential(currentUser.email, senhaAtual);
    await reauthenticateWithCredential(currentUser, credential);

    // 2️⃣ Atualiza o nome, se mudou
    if (nomeInput.value !== currentUser.displayName) {
      await updateProfile(currentUser, { displayName: nomeInput.value });
    }

    // 3️⃣ Se o e-mail foi alterado, envia verificação
    if (emailInput.value !== currentUser.email) {
      await verifyBeforeUpdateEmail(currentUser, emailInput.value);
      alert(
        "📧 Um e-mail de verificação foi enviado para o novo endereço.\n" +
        "Verifique sua caixa de entrada e confirme para concluir a mudança de e-mail."
      );
    }

    // 4️⃣ Atualiza a senha, se foi preenchida
    if (novaSenhaInput.value) {
      await updatePassword(currentUser, novaSenhaInput.value);
    }

    alert("✅ Alterações salvas com sucesso!\n(O e-mail será atualizado após a verificação.)");
    senhaAtualInput.value = "";
    novaSenhaInput.value = "";
  } catch (error) {
    alert("❌ Erro ao salvar alterações: " + error.message);
  }
});

// 🔹 Botão voltar
voltarBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
