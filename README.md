# 📊 Real-Time Sentiment Analysis Dashboard  
* Dashboard inteligente para monitoramento de sentimentos em tempo real a partir de interações em redes sociais como Instagram e Facebook.
O sistema combina processamento backend em Java (Spring Boot) com um frontend React moderno, utilizando Server-Sent Events (SSE) para atualizações instantâneas, sem necessidade de refresh da página.

* Projeto desenvolvido durante o Hackathon – FeedbackNow Team 🚀

## 1.🎯 Visão Geral  
O objetivo do projeto é oferecer uma visão clara, rápida e acionável sobre o sentimento dos usuários, permitindo:
* Acompanhamento em tempo real de feedbacks
* Identificação rápida de picos negativos
* Visualização histórica e estatística
* Alertas imediatos por canal de origem

## 2. 🚀 Funcionalidades Implementadas  
* Monitoramento em Tempo Real (SSE)
* Conexão persistente via Server-Sent Events com o AlertService no backend
* Recebimento instantâneo de novos feedbacks assim que são processados
* Atualização automática dos gráficos e contadores sem reload da página

## 3. 📈 Visualização Temporal de Sentimentos
* Gráfico de Linha Dinâmico
* Exibe a evolução de sentimentos positivos e negativos ao longo do tempo
* Curvas suavizadas para melhor leitura visual
* Atualização incremental conforme novos eventos chegam via SSE

## 4. 🍩 Distribuição de Sentimentos
* Gráfico de Rosca (Doughnut Chart)
* Comparação visual entre feedbacks positivos e negativos
* Atualizado tanto na carga inicial quanto em tempo real

## 5. 🔔 Sistema de Notificações Inteligente (Badges)
* Ícones sociais com contadores de mensagens não lidas
* Identificação automática da origem do feedback:  
  * 📸 Instagram
  * 📘 Facebook
* Classificação baseada em:
  * Metadados recebidos do backend
  * Palavras-chave presentes no conteúdo do comentário

## 6. 🧠 Gestão de Estado Avançada  
* Contadores de notificações são:
  * Incrementados ao chegar novo feedback
  * Resetados automaticamente após leitura

* Estado sincronizado entre:
  * Lista de mensagens
  * Gráficos
  * Badges de notificação

## 7.🌙 Interface Dark Premium
* Layout moderno, escuro e escaneável
* Cards de resumo com métricas principais
* Modais responsivos para leitura de feedbacks
* Ícones vetoriais elegantes usando Lucide-React

## 8. 🛠️ Tecnologias Utilizadas

### 8.1. Frontend
* React.js (Vite) – Framework principal e ferramenta de build.
* Axios – Cliente HTTP para consumo da API REST.
* EventSource (SSE) – Protocolo para recebimento de alertas em tempo real.
* React-Chartjs-2 – Integração para visualização de dados (utilizando Chart.js).
* Lucide-React – Biblioteca de ícones leves e modernos.
* CSS Dinâmico – Estilização baseada em estados para feedback visual do usuário.

### 9.1. Backend (Base)
* Java 21 com Spring Boot
* PostgreSQL
* Flask/Python motor de IA

## 10. 📋 Pré-requisitos
* Antes de iniciar, certifique-se de ter instalado:
  * Node.js ≥ 18 versao LTS
* Backend Java com Spring Boot rodando em http://localhost:8080
* Banco de dados PostgreSQL configurado e ativo
* Python/Flask motor de IA rodando em http://localhost:5000

## 11. ⚙️ Instalação e Execução
### 11.1. Clonar o repositório ou fazer o download zip 
* No terminal executar git clone https://github.com/Evertonferrg/feedbacknow_frontend_hackathon.git
* Ou fazer o download zip e extrair numa pasta no seu computador

### 11.2. Instalar dependências essenciais  
* entre no diretorio raiz:  
``` /react-feedbacknow ```
* digite:  
```npm install axios chart.js react-chartjs-2 lucide-react date-fns chartjs-adapter-date-fns```

### 11.3. Executar o Frontend
* Execute o comando: ```npm run dev```
* A aplicação estará disponível em:
  * http://localhost:5173

## 12. Fluxo de Dados da Aplicação
* Carga Inicial
  * O frontend faz uma requisição REST ao Spring Boot
  * Todos os feedbacks históricos são carregados do PostgreSQL

* Inscrição SSE
  * O React abre uma conexão persistente com o backend via EventSource

* Recebimento de Alertas
  * Novos comentários processados disparam eventos SSE
  * O frontend recebe o JSON em tempo real

* Processamento no Frontend
  * O feedback é:
    * Inserido na lista
    * Atualiza gráficos
    * Incrementa badges conforme a origem

* Leitura e Reset
  * Ao abrir o modal de mensagens:
    * Feedbacks são marcados como lidos
    * Contadores são resetados automaticamente

## 📂 Estrutura de Arquivos Relevante
```json
src/
└── pages/
      └── Dashboard/
             └── Dashboard.jsx   # Lógica principal, gráficos, SSE e estado
package.json                     # Dependências e scripts
```
## 🏁 Status do Projeto

✅ Backend integrado  
✅ Dashboard funcional  
✅ Atualização em tempo real  
✅ Interface premium dark  
🚀 Pronto para apresentação e evolução

-----------------------------------------------
Desenvolvido durante o Hackathon - FeedbackNow Team 🚀
