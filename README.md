# Controle de Contas

API REST para gerenciamento de contas e controle financeiro pessoal.

Projeto desenvolvido para praticar desenvolvimento backend, utilizando TypeScript, Node.js, Express e PostgreSQL.

## Tecnologias

- Node.js
- TypeScript
- Express
- PostgreSQL
- Zod

## Funcionalidades

- Cadastrar, listar, atualizar e excluir contas.
- Controlar parcelas e vencimentos.
- Marcar contas como pagas.
- Consultar resumo financeiro (total, pago e pendente).
- Validar dados e regras de negócio.
- Persistir informações no PostgreSQL.

## Arquitetura

O projeto utiliza arquitetura em camadas:

Routes → Controllers → Services → Repositories → Database.

## Como executar

1. Entre na pasta `backend`.
2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env` com os dados do PostgreSQL:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=seu_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

4. Crie a tabela `accounts` no PostgreSQL conforme a estrutura utilizada pelo projeto.

5. Inicie o servidor:

```bash
npm run dev
```

## Endpoints

| Método | Endpoint            | Descrição         |
| ------ | ------------------- | ----------------- |
| GET    | `/accounts`         | Listar contas     |
| GET    | `/accounts/summary` | Resumo financeiro |
| GET    | `/accounts/:id`     | Buscar conta      |
| POST   | `/accounts`         | Criar conta       |
| PATCH  | `/accounts/:id`     | Atualizar conta   |
| DELETE | `/accounts/:id`     | Excluir conta     |

## Objetivo

Projeto desenvolvido para fins de aprendizado e construção de portfólio, aplicando conceitos de APIs REST, TypeScript, PostgreSQL e organização de código backend.
