📊 Real-Time Sentiment Analysis Dashboard

Dashboard inteligente para monitoramento de sentimentos em tempo real a partir de interações em redes sociais como Instagram e Facebook.
O sistema combina processamento backend em Java (Spring Boot) com um frontend React moderno, utilizando Server-Sent Events (SSE) para atualizações instantâneas, sem necessidade de refresh da página.

Projeto desenvolvido durante o Hackathon – FeedbackNow Team 🚀

🎯 Visão Geral

O objetivo do projeto é oferecer uma visão clara, rápida e acionável sobre o sentimento dos usuários, permitindo:

Acompanhamento em tempo real de feedbacks

Identificação rápida de picos negativos

Visualização histórica e estatística

Alertas imediatos por canal de origem

🚀 Funcionalidades Implementadas
🔴 Monitoramento em Tempo Real (SSE)

Conexão persistente via Server-Sent Events com o AlertService no backend

Recebimento instantâneo de novos feedbacks assim que são processados

Atualização automática dos gráficos e contadores sem reload da página

📈 Visualização Temporal de Sentimentos

Gráfico de Linha Dinâmico

Exibe a evolução de sentimentos positivos e negativos ao longo do tempo

Curvas suavizadas para melhor leitura visual

Atualização incremental conforme novos eventos chegam via SSE

🍩 Distribuição de Sentimentos

Gráfico de Rosca (Doughnut Chart)

Comparação visual entre feedbacks positivos e negativos

Atualizado tanto na carga inicial quanto em tempo real

🔔 Sistema de Notificações Inteligente (Badges)

Ícones sociais com contadores de mensagens não lidas

Identificação automática da origem do feedback:

📸 Instagram

📘 Facebook

Classificação baseada em:

Metadados recebidos do backend

Palavras-chave presentes no conteúdo do comentário

🧠 Gestão de Estado Avançada

Contadores de notificações são:

Incrementados ao chegar novo feedback

Resetados automaticamente após leitura

Estado sincronizado entre:

Lista de mensagens

Gráficos

Badges de notificação

🌙 Interface Dark Premium

Layout moderno, escuro e escaneável

Cards de resumo com métricas principais

Modais responsivos para leitura de feedbacks

Ícones vetoriais elegantes usando Lucide-React

🛠️ Tecnologias Utilizadas
🔹 Frontend

React.js (Vite)

Axios – Consumo de APIs REST

EventSource (SSE) – Comunicação em tempo real

Chart.js

React-Chartjs-2

Lucide-React – Ícones

CSS-in-JS (Inline Dinâmico)

🔹 Backend (Base)

Java

Spring Boot

Spring Data JPA

PostgreSQL

Server-Sent Events (SSE)

AlertService

Sentiments API

📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

Node.js ≥ 18

NPM ou Yarn

Backend Spring Boot rodando em http://localhost:8080

Banco de dados PostgreSQL configurado e ativo

⚙️ Instalação e Execução
1️⃣ Clonar o repositório
git clone https://seu-repositorio-aqui.git
cd react-feedbacknow

2️⃣ Instalar dependências essenciais
npm install axios chart.js react-chartjs-2 lucide-react

3️⃣ Dependências opcionais (Escala Temporal Avançada)

Recomendado caso utilize gráficos com TimeScale real:

npm install date-fns chartjs-adapter-date-fns

4️⃣ Configurar URLs do Backend

No arquivo:

/src/pages/Dashboard/Dashboard.jsx


Verifique:

API REST: http://localhost:8080/sentiments/all
SSE Stream: http://localhost:8080/alerts/subscribe

5️⃣ Executar o Frontend
npm run dev


A aplicação estará disponível em:

http://localhost:5173

🔄 Fluxo de Dados da Aplicação
🔹 Carga Inicial

O frontend faz uma requisição REST ao Spring Boot

Todos os feedbacks históricos são carregados do PostgreSQL

🔹 Inscrição SSE

O React abre uma conexão persistente com o backend via EventSource

🔹 Recebimento de Alertas

Novos comentários processados disparam eventos SSE

O frontend recebe o JSON em tempo real

🔹 Processamento no Frontend

O feedback é:

Inserido na lista

Atualiza gráficos

Incrementa badges conforme a origem

🔹 Leitura e Reset

Ao abrir o modal de mensagens:

Feedbacks são marcados como lidos

Contadores são resetados automaticamente

📂 Estrutura de Arquivos Relevante
src/
 └── pages/
     └── Dashboard/
         └── Dashboard.jsx   # Lógica principal, gráficos, SSE e estado
package.json                # Dependências e scripts

🏁 Status do Projeto

✅ Backend integrado
✅ Dashboard funcional
✅ Atualização em tempo real
✅ Interface premium dark
🚀 Pronto para apresentação e evolução

-----------------------------------------------
Desenvolvido durante o Hackathon - FeedbackNow Team 🚀