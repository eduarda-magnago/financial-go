let mensagensCache = []; 

async function carregarMensagens() {
  try {
    const res = await fetch('/mensagens');
    if (!res.ok) throw new Error("Erro ao buscar mensagens");

    mensagensCache = await res.json();

    const lista = document.getElementById("lista-mensagens");
    lista.innerHTML = "";

    if (mensagensCache.length === 0) {
      lista.innerHTML = `<div class="tabela-linha"><span>Nenhuma mensagem recebida ainda.</span></div>`;
      return;
    }

    mensagensCache.forEach((msg, index) => {
      const linha = document.createElement("div");
      linha.classList.add("tabela-linha");

      const previewTexto = msg.mensagem.length > 50 ? msg.mensagem.substring(0, 50) + "..." : msg.mensagem;

      linha.innerHTML = `
        <span>${msg.nome}</span>
        <span class="col-assunto"><strong>${msg.assunto}</strong><span class="preview">${previewTexto}</span></span>
        <span class="${msg.classificacao === 'Produtivo' ? 'produtivo' : 'improdutivo'}">${msg.classificacao}</span>
        <span><button class="btn-visualizar" onclick="verMensagem(${index})">Visualizar</button></span>
        <span><button class="btn-excluir" onclick="excluirMensagem(${index})"><i class="fa-solid fa-trash"></i></button></span>
      `;

      lista.appendChild(linha);
    });
  } catch (err) {
    console.error("Erro ao carregar mensagens:", err);
    alert("Não foi possível carregar as mensagens do servidor.");
  }
}

function verMensagem(index) {
  const msg = mensagensCache[index];
  if (!msg) return;

  alert(
    `Nome: ${msg.nome}\n\n` +
    `Email: ${msg.email}\n\n` +
    `Assunto: ${msg.assunto}\n\n` +
    `Mensagem: ${msg.mensagem}\n\n` +
    `Resposta automática: ${msg.resposta}`
  );
}

async function excluirMensagem(index) {
  if (!confirm("Deseja realmente excluir esta mensagem?")) return;

  try {
    const res = await fetch(`/mensagens/${index}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Falha ao excluir");
    await carregarMensagens();
  } catch (err) {
    console.error(err);
    alert("Não foi possível excluir a mensagem.");
  }
}

document.addEventListener("DOMContentLoaded", carregarMensagens);

