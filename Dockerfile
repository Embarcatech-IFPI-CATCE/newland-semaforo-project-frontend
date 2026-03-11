# ==========================================
# ESTÁGIO 1: Build com Node.js
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os ficheiros de dependências primeiro (Otimização de cache do Docker)
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código
COPY . .

# Passa o IP do Backend na hora de construir os ficheiros (Vamos injetar isto via docker-compose depois!)
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# Compila o projeto React (Gera a pasta /build)
RUN npm run build

# ==========================================
# ESTÁGIO 2: Servir com Nginx
# ==========================================
FROM nginx:alpine

# Remove a página padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os ficheiros compilados do Estágio 1 para o Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copia as configurações do Nginx (Vamos criar este ficheiro no próximo passo)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 (padrão web)
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]