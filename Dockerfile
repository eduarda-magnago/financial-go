# Imagem base com Python
FROM python:3.10-slim

# Evitar prompts interativos
ENV DEBIAN_FRONTEND=noninteractive

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY . /app

# Atualizar pip e instalar dependências
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Hugging Face precisa do cache em /root/.cache
ENV TRANSFORMERS_CACHE=/root/.cache/huggingface

# Porta padrão do Spaces
ENV PORT=7860

# Expor a porta
EXPOSE 7860

# Rodar usando gunicorn (mais estável que flask run)
CMD ["gunicorn", "-b", "0.0.0.0:7860", "app:app"]
