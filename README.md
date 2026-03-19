# Connect Dev

![ConnectDev](public/assets/images/connect_dev.svg)

Rede social simples para estudos, com autenticação, páginas de perfil e feed, usando Node.js + Express + Mustache.

## Tecnologias

- Node.js: runtime do servidor.
- TypeScript: tipagem e organização do código.
- Express 5: framework HTTP e rotas.
- Mustache: renderização das views.
- MySQL2: acesso ao banco com pool de conexões.
- Zod: validação de dados (login/registro).
- Helmet: segurança e CSP.
- express-session + connect-flash: sessão e mensagens de erro.
- bcryptjs: hash de senha.

## Como rodar

1. Instale as dependências:

```
npm install
```

2. Configure a porta em `.env` (exemplo):

```
PORT=3000
```

3. Configure o banco MySQL:

- Host: `127.0.0.1`
- Usuário: `root`
- Senha: `1234`
- Banco: `connect_dev`

Os dados de conexão estão em `src/database/connection.ts`.

4. Rodar em modo dev:

```
npm run dev
```

5. Build de produção:

```
npm run build
```

6. Rodar produção:

```
npm start
```

## Estrutura do projeto

- `src/app.ts` inicializa o servidor, middlewares, view engine e rotas.
- `src/routes` define as rotas por módulo.
- `src/controller` controla as requisições e renderiza views.
- `src/service` concentra regras de negócio e integrações.
- `src/repository` acessa o banco de dados.
- `src/database` configuração do pool MySQL.
- `src/schema` validação com Zod.
- `src/utils` utilitários (ex.: página ativa).
- `src/views` templates Mustache.
- `public` arquivos estáticos (CSS, JS, imagens).

## Views

- `src/views/pages` páginas principais (home, perfil, friends, etc.).
- `src/views/partials` componentes reutilizáveis (header, aside, footer, etc.).

## Rotas principais

- `/` Home
- `/perfil` Perfil
- `/login` Login
- `/register` Registro

## Imagem do projeto

O logo simples do projeto fica em:

- `public/assets/images/connect_dev.svg`
