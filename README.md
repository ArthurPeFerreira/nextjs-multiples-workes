# Next.js Cluster Example with PM2 and server.js

Este repositório serve como exemplo de clusterização de um aplicativo Node.js (no caso desse exemplo em Next.js mas pode ser qualquer servidor servidor HTTP) usando a API de `cluster` do Node e gerenciado pelo PM2 para múltiplos workers na **mesma porta**.

---

## 🚀 Visão Geral

* **server.js**: implementa clusterização nativa do Node.js, forkeando um master e N workers (um por CPU)
* **PM2**: gerencia o processo master (auto-restart, logs, zero-downtime)
* **Porta única**: todos os workers escutam na porta `3000` sem conflito

---

## 📁 Estrutura do Repositório

```text
├── server.js                    # Código de cluster com Node.js
├── ecosystem.config.js          # Configuração PM2 para rodar server.js
├── src/                         # Código-fonte da aplicação
├── package.json                 # Dependências e scripts
├── .env                         # Variáveis de ambiente exemplo
└── README.md                    # Este arquivo
└── Outros Arquivos do NextJS    # Outros Arquivos do NextJS
```

---

## 🔧 Setup Local

1. **Clonar repositório**:

   ```bash
   git clone nextjs-multiples-workes.git
   cd nextjs-multiples-workes/
   ```

2. **Instalar dependências**:

   ```bash
   npm install
   ```

3. **Executar sem PM2** (apenas Node):

   ```bash
   node server.mjs
   ```

5. **Executar com PM2 (Já Foi Instalado no Passo 2)**:

   ```bash
   pm2 delete all            # limpa processos anteriores
   pm2 start ecosystem.config.js
   pm2 save
   pm2 status
   ```

> Isso iniciará **1 master** e N workers (CPU cores), todos atendendo na **mesma porta 3000**.

## 📊 PM2 Comandos Úteis

* `pm2 start ecosystem.config.js`     : inicia o server.js
* `pm2 stop nextjs-multiples-workes`  : para o serviço
* `pm2 status`                        : exibe status de apps
* `pm2 logs`                          : visualiza logs
* `pm2 restart app-cluster`           : reinicia master (e mantém workers)
* `pm2 reload ecosystem.config.js`    : graceful reload sem downtime
* `pm2 delete all`                    : remove todos apps
