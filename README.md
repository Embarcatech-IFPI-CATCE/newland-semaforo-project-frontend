# 🚦 Workshop Service Monitor - Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

Interface de usuário (Frontend) do **Projeto Semáforo**, um sistema IoT desenvolvido durante a Residência Tecnológica em Sistemas Embarcados (EmbarcaTech) para o **Grupo Newland Toyota**. 

O objetivo desta aplicação é fornecer uma visualização em tempo real do chão de fábrica, permitindo o acompanhamento de Ordens de Serviço (OS), métricas de produtividade dos técnicos e a gestão completa dos boxes da oficina.

---

## ✨ Funcionalidades Principais

* **📊 Dashboard em Tempo Real:** Acompanhamento dinâmico do status de cada box (Livre, Ocupado, Em Pausa) e métricas gerais de faturamento e andamento das OS.
* **👨‍🔧 Visão Operacional do Técnico:** Interface otimizada para o chão de fábrica, permitindo visualizar a tarefa atual e realizar marcações de tempo (Play/Pause) que espelham a interação física com o leitor RFID.
* **⚙️ Gestão Administrativa (CRUDs):** Telas dedicadas para o cadastro e gerenciamento de Técnicos, Boxes e Catálogo de Tarefas.
* **☁️ Atualização Remota (OTA):** Módulo avançado para upload de arquivos de firmware (`.bin`), disparando atualizações pela rede para os microcontroladores ESP32 espalhados pela oficina.
* **🔐 Controle de Acesso:** Sistema de rotas protegidas (Gatekeeper), separando a visão gerencial da visão operacional.

---

## 🛠️ Tecnologias Utilizadas

O ecossistema do frontend foi escolhido visando alta reatividade e velocidade de compilação:

* **[React.js](https://reactjs.org/)**: Biblioteca para construção de interfaces de usuário.
* **[Vite](https://vitejs.dev/)**: Ferramenta de build e servidor de desenvolvimento ultra-rápido.
* **[React Router Dom](https://reactrouter.com/)**: Gerenciamento das rotas (Single Page Application).
* **[Axios](https://axios-http.com/)**: Cliente HTTP HTTP para comunicação com a API REST (Spring Boot).

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* **Node.js** (versão 18 ou superior)
* **NPM** ou **Yarn**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/EnzoMello/Workshop-service-frontend.git](https://github.com/EnzoMello/Workshop-service-frontend.git)
   ```

2. **Acesse a pasta do projeto:**
```bash
   cd Workshop-service-frontend
```

3. **Instale as dependências:**
```bash
   npm install
```

4. **Inicie o servidor de desenvolvimento**
```bash
   npm run dev
```
