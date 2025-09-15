from flask import Flask, request, jsonify, render_template, redirect, url_for
import json
import os
import re
from transformers import pipeline

app = Flask(__name__, template_folder="templates", static_folder="front-end")

ARQUIVO_MENSAGENS = "mensagens.json"
mensagens = []

SENHA_ADMIN = "adm-123"

classifier = pipeline(
    "zero-shot-classification",
    model="joeddav/xlm-roberta-large-xnli"
)

THRESHOLD_PRODUTIVO = 0.65

def salvar_mensagens():
    with open(ARQUIVO_MENSAGENS, "w", encoding="utf-8") as f:
        json.dump(mensagens, f, ensure_ascii=False, indent=2)

def carregar_mensagens():
    global mensagens
    if os.path.exists(ARQUIVO_MENSAGENS):
        with open(ARQUIVO_MENSAGENS, "r", encoding="utf-8") as f:
            mensagens.extend(json.load(f))

def heuristica_improdutivo(texto):
    """
    Casos óbvios de improdutivo: cumprimentos, felicitações e agradecimentos.
    """
    if not texto:
        return False

    t = texto.lower()
    patterns = [
        r"\bbom dia\b", r"\bboa tarde\b", r"\bboa noite\b",
        r"\bfeliz natal\b", r"\bfeliz ano novo\b",
        r"\bparabéns\b",
        r"\bobrigad[oa]\b", r"\bmuito obrigado\b"
    ]
    for p in patterns:
        if re.search(p, t):
            return True
    return False

def gerar_classificacao_resposta(texto):
    try:
        if heuristica_improdutivo(texto):
            categoria = "Improdutivo"
            resposta_auto = "Agradecemos sua mensagem. Tenha um ótimo dia!"
            return categoria, resposta_auto

        resultado = classifier(
            sequences=texto,
            candidate_labels=["Produtivo", "Improdutivo"],
            hypothesis_template="Este email é {}."
        )

        print("Resultado classificação:", resultado)

        label_escolhida = resultado["labels"][0]
        score = resultado["scores"][0]

        if label_escolhida == "Produtivo" and score >= THRESHOLD_PRODUTIVO:
            categoria = "Produtivo"
            resposta_auto = (
                "Olá! Sua mensagem foi recebida e encaminhada à equipe responsável. "
                "Entraremos em contato o mais rápido possível para solucionar sua questão! "
                "Atc, Equipe de Suporte."
            )
        else:
            categoria = "Improdutivo"
            resposta_auto = "Agradecemos sua mensagem. Tenha um ótimo dia!"

        return categoria, resposta_auto

    except Exception as e:
        print("Erro na classificação:", e)
        return "Improdutivo", "Agradecemos sua mensagem. Tenha um ótimo dia!"

carregar_mensagens()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/admin", methods=["GET", "POST"])
def admin():
    if request.method == "POST":
        senha = request.form.get("senha", "")
        if senha == SENHA_ADMIN:
            return redirect(url_for("dashboard"))
        else:
            return render_template("admin.html", erro=True)
    return render_template("admin.html", erro=False)

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/classificar", methods=["POST"])
def classificar():
    data = request.json
    categoria, resposta = gerar_classificacao_resposta(data.get("mensagem", ""))
    nova_msg = {
        "nome": data.get("nome", ""),
        "email": data.get("email", ""),
        "assunto": data.get("assunto", ""),
        "mensagem": data.get("mensagem", ""),
        "classificacao": categoria,
        "resposta": resposta,
    }
    mensagens.append(nova_msg)
    salvar_mensagens()
    return jsonify(nova_msg)

@app.route("/mensagens", methods=["GET"])
def listar_mensagens():
    return jsonify(mensagens)

@app.route("/mensagens/<int:index>", methods=["DELETE"])
def deletar_mensagem(index):
    try:
        if 0 <= index < len(mensagens):
            mensagens.pop(index)
            salvar_mensagens()
            return jsonify({"sucesso": True})
        else:
            return jsonify({"erro": "Índice inválido"}), 400
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    print("Device set to use cpu")
    app.run(debug=True)
