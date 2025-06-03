# React CRUD Fullstack App

This is a full-stack CRUD application built using **React (Next.js)** for the frontend, **Express (TypeScript)** for the backend, and **Prisma ORM** with **SQLite** as the database.

---

## 📁 Project Structure

```
react-crud/
│
├── client/                # Next.js React frontend
│
├── server/                # Express TypeScript backend
│   ├── src/
│   │   ├── features/      # Feature modules (products, etc.)
│   │   ├── middleware/    # Error and 404 handlers
│   │   ├── errors/        # Custom error classes
│   │   └── main.ts        # Entry point
│   └── prisma/
│       ├── schema.prisma  # Prisma schema
│       └── generated/     # Custom-generated Prisma client
│
├── .env                   # Environment variables
├── package.json           # Project scripts
└── README.md              # This file
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/react-crud.git
cd react-crud
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Generate Prisma Client

```bash
pnpm ps:generate
```

This uses a custom output path defined in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../prisma/generated/client"
}
```

### 4. Apply Database Migrations

```bash
pnpm ps:migrate
```

This creates the `dev.db` SQLite file and sets up the schema.

### 5. Start the App

```bash
pnpm dev
```

This runs both the **client** and **server** concurrently:

- Client: [http://localhost:3000](http://localhost:3000)
- Server: [http://localhost:4000](http://localhost:4000)

---

## 🧪 Available Scripts

| Script            | Description                                  |
|-------------------|----------------------------------------------|
| `pnpm dev`        | Start client and server concurrently         |
| `pnpm dev:client` | Start Next.js client only                    |
| `pnpm dev:server` | Start Express server only                    |
| `pnpm ps:generate`| Generate Prisma client                       |
| `pnpm ps:migrate` | Run database migrations                      |
| `pnpm ps:studio`  | Open Prisma Studio (visual DB browser)       |
| `pnpm seed:server`| (Optional) Seed the database                 |
| `pnpm rollback:server`| (Optional) Rollback the last migration |

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
PORT=4000
```

You can extend it with more config as needed.

---

## ✅ Features

- Full-stack CRUD (Create, Read, Update, Delete)
- Modular Express routes with services and controllers
- Prisma ORM with SQLite (can be swapped with PostgreSQL, MySQL, etc.)
- Error handling middleware for:
  - Prisma constraint violations
  - Malformed JSON
  - Custom app-level errors

---

## 🐛 Common Issues

### ❗ `Cannot find module '.prisma/client/default'`

This happens if:
- Prisma was not generated correctly, or
- `@prisma/client` is imported incorrectly

✅ **Fix**: Use your custom generated client:

```ts
import { PrismaClient } from '../../prisma/generated/client';
```

For runtime errors like `PrismaClientKnownRequestError`:

```ts
import { PrismaClientKnownRequestError } from '../../prisma/generated/client/runtime';
```

---

## 📄 License

MIT © Md Tanjir Mahabub