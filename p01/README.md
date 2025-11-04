# Env & basic setup

**Target: Get a "pong" message using fastify + db**

---

## TODO

- init fastify + typescript 
- env (dotenv)
- link PostgerSQL (docker)
- init prisma ORM

---

## Learning point

- `fastify.register()`
- `app.get('/', handle)` route define
- `.env` manage db URL

---

## Practice

- init npm
- create `/api/ping` route -> return `{ message: "pong" }`
- create a table `user` by prisma, and success to read write data