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

## Use

### Setup
- setup `/.env` -> `POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB`
- setup `srcs/.env` -> `DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@127.0.0.1:5432/$POSTGRES_DB$?schema=public"`

### Makefile
- db & server start `make`
- server off `ctrl+c`
- db off `make down`
- db + server off + delete db `make fclean`

### Command
- create user `curl -X POST -H "Content-Type: application/json" -d '{"name":"name","email":"email@gmail.com"}' 127.0.0.1:8080/api/user/add`
- get all users `curl -X GET 127.0.0.1:8080/api/user/all`
- delete user `curl -X DELETE 127.0.0.1:8080/api/user/delete?id='id'`
- db gui tool `make check`