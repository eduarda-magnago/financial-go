const botaoServicos = document.getElementById('botao-servicos');
const secaoServicos = document.getElementById('secao-servicos');
if (secaoServicos && botaoServicos) {
  secaoServicos.style.display = 'none';
  botaoServicos.addEventListener('click', () => {
    secaoServicos.style.display = (secaoServicos.style.display === 'none') ? 'grid' : 'none';
  });
}

const botaoContato = document.querySelector('.botao-preenchido');
const modal = document.getElementById('modal-contato');
const fechar = document.querySelector('.fechar');

if (botaoContato && modal && fechar) {
  botaoContato.addEventListener('click', () => modal.style.display = 'block');
  fechar.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}

const formContato = document.querySelector(".form-contato");

if (formContato) {
  formContato.addEventListener("submit", async function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;

    const nomeCompleto = `${nome} ${sobrenome}`.trim();

    try {
      const res = await fetch('/classificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeCompleto, email, assunto, mensagem })
      });

      if (!res.ok) throw new Error("Falha ao chamar o backend");
      const resultado = await res.json();

      alert("Mensagem enviada com sucesso!");
      modal.style.display = 'none';
      formContato.reset();

    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      alert("Erro ao enviar a mensagem. Tente novamente.");
    }
  });
}
