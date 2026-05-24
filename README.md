# MindLog — Full Stack

Aplicação de anotações pessoais com autenticação JWT, construída com React + Node.js + PostgreSQL.

```
/project
  /frontend   → React + Vite (porta 5173)
  /backend    → Node.js + Express + Prisma + PostgreSQL (porta 3333)
```

---

## Pré-requisitos

| Ferramenta   | Versão mínima |
|-------------|---------------|
| Node.js     | 18.x          |
| npm         | 9.x           |
| PostgreSQL  | 14.x          |

---

## 1. Banco de dados

Crie o banco antes de subir o backend:

```sql
CREATE DATABASE mindlog_db;
```

---

## 2. Backend

```bash
cd backend

# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais do PostgreSQL e um JWT_SECRET forte

# 3. Rodar migrations (cria as tabelas)
npm run db:migrate

# 4. (Opcional) Popular banco com dados de demo
npm run db:seed

# 5. Iniciar em modo desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

---

## 3. Frontend

```bash
cd frontend

# 1. Instalar dependências
npm install

# 2. (Opcional) Configurar variável de ambiente
cp .env.example .env
# Por padrão já aponta para http://localhost:3333/api

# 3. Iniciar em modo desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:5173`.

---

## Endpoints da API

### Auth — público

| Método | Rota                  | Body                          | Descrição         |
|--------|-----------------------|-------------------------------|-------------------|
| POST   | `/api/auth/register`  | `{ login, nome, senha }`      | Criar conta       |
| POST   | `/api/auth/login`     | `{ login, senha }`            | Login → JWT token |

### Users — autenticado (Bearer token)

| Método | Rota            | Body       | Descrição            |
|--------|-----------------|------------|----------------------|
| GET    | `/api/users/me` | —          | Perfil do usuário    |
| PATCH  | `/api/users/me` | `{ nome }` | Atualizar nome       |

### Cards — autenticado (Bearer token)

| Método | Rota              | Body / Query                              | Descrição           |
|--------|-------------------|-------------------------------------------|---------------------|
| GET    | `/api/cards`      | `?search=texto&prioridade=Alta`           | Listar cards        |
| POST   | `/api/cards`      | `{ titulo, descricao?, prioridade, prazo? }` | Criar card       |
| GET    | `/api/cards/:id`  | —                                         | Buscar card por ID  |
| PUT    | `/api/cards/:id`  | `{ titulo, descricao?, prioridade, prazo? }` | Substituir card  |
| PATCH  | `/api/cards/:id`  | campos parciais                           | Atualizar card      |
| DELETE | `/api/cards/:id`  | —                                         | Excluir card        |

### Health check

| Método | Rota           | Descrição              |
|--------|----------------|------------------------|
| GET    | `/api/health`  | Verifica se API está up |

---

## Estrutura do backend

```
backend/
├── prisma/
│   ├── schema.prisma          # Modelos User e Card
│   └── migrations/            # SQL gerado pelo Prisma
├── src/
│   ├── config/
│   │   ├── database.js        # Singleton do PrismaClient
│   │   └── jwt.js             # Configuração do JWT
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── card.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js        # Verifica JWT
│   │   ├── validate.middleware.js    # Valida body com Zod
│   │   └── errorHandler.middleware.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── card.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── auth.service.js    # register / login
│   │   ├── card.service.js    # CRUD de cards
│   │   └── user.service.js    # perfil
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── card.validator.js
│   │   └── user.validator.js
│   ├── utils/
│   │   ├── AppError.js        # Classe de erros operacionais
│   │   └── seed.js            # Script de seed
│   ├── app.js                 # Express + middlewares globais
│   └── server.js              # Ponto de entrada
└── .env.example
```

---

## Variáveis de ambiente

### Backend (`.env`)

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/mindlog_db"
JWT_SECRET="segredo-forte-com-pelo-menos-32-caracteres"
JWT_EXPIRES_IN="7d"
PORT=3333
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:3333/api
```

---

## Decisões de arquitetura

**Separação em camadas:** cada responsabilidade tem sua camada — routes (roteamento) → controller (HTTP) → service (negócio) → prisma (dados). Isso facilita testes unitários por camada.

**express-async-errors:** elimina a necessidade de `try/catch` em cada controller async — qualquer `throw` é automaticamente encaminhado ao errorHandler global.

**Zod:** validação com tipagem estática. O middleware `validate()` substitui o body pelo dado já parseado, garantindo que controllers recebam dados limpos.

**AppError:** distingue erros operacionais (previstos, com statusCode) de erros inesperados (bugs), que nunca expõem detalhes internos em produção.

**bcryptjs:** senhas sempre armazenadas com hash — nunca em plain text.

**JWT sem refresh token (MVP):** tokens de 7 dias. Para produção, considere adicionar refresh tokens com rotação.

**Rate limiting duplo:** 200 req/15min para rotas gerais, 20 req/15min especificamente nas rotas de autenticação, prevenindo brute force.
