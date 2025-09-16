# Classificador de E-mails 📭

## Sobre o projeto

Este projeto é uma aplicação web interativa que utiliza Inteligência Artificial para classificar emails recebidos em Produtivo ou Improdutivo e gerar respostas automáticas. 

---

## Objetivo

O objetivo principal é automatizar a triagem de emails em uma empresa financeira fictícia chamada FinancialGo. 
Com isso, a equipe pode se concentrar nas mensagens que realmente exigem ação, como problemas técnicos, solicitações de documentos ou dúvidas de clientes, enquanto mensagens triviais como cumprimentos, agradecimentos e felicitações podem ser deixadas como segundo plano.
Além de agilizar a operação, o projeto busca demonstrar a integração de NLP (Processamento de Linguagem Natural) com interfaces web simples, permitindo que usuários sem conhecimento técnico possam interagir facilmente com a aplicação.

---

## Funcionalidades
1. Envio direto de emails via formulário de contato. 
2. Classificação automática:<br>
  **Produtivo**: emails que requerem ação da empresa (suporte, problemas técnicos, documentos, solicitações).
  **Improdutivo**: emails triviais (cumprimentos, felicitações, agradecimentos simples, compartilhamentos sem solicitação).
3. Resposta automática sugerida.
4. Dashboard para visualizar e deletar mensagens.

---

## Tecnologias utilizadas
- Python 
- Flask
- Hugging Face 
- HTML/CSS/JS

---

## Vídeo explicativo do projeto 
Link: https://www.youtube.com/watch?v=vzW-lHRGetA

---

## Deploy
O modelo usado nesse projeto foi o "joeddav/xlm-roberta-large-xnli" da Hugging Face, que exige muitos recursos para funcionar no Deploy. Plataformas gratuitas como Replit, Heroku e Glitch não ofereceram essa capacidade para suportar o projeto. Por isso, no momento, ele só funciona corretamente no ambiente local e não pode ficar no ar até termos uma hospedagem paga e adequada.

Entretanto, siga as instruções de execução para testar o repositório localmente. 

---

## Instruções de execução 📃
- pip install -r requirements.txt (instalar dependência)
- python app.py (rodar a aplicação)

---

## Senha do Admin 🔑 
Senha para acessar a dashboard com os e-mails que foram enviados:<br>
Senha: adm-123
