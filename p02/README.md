# Env & basic setup

**Target: Register, login, auth**

---

## Learning point

- Fastify JWT Plugin (`@fastify/jwt`)
- password hash (`bcrypt`)
- token auth
- prisma access db

---

## Practice

**Route:**
- `POST /api/register`: register new user
- `POST /api/login`: auth and return JWT
- `GET /me`: auth JWT and return user's data

---

## Use

### Setup (base on p01)

- `/srcs/.env` -> `JWT_SECRET`

### Makefile
- db & server start `make`
- server off `ctrl+c`
- db off `make down`
- db + server off + delete db `make fclean`

### Command

#### New
- Register user `curl -X POST -H "Content-Type: application/json" -d '{"name":"name","email":"email","password":"password"}' 127.0.0.1:8080/auth/register`
- Login `curl -X POST -H "Content-Type: application/json" -d '{"email":"email","password":"password"}' 127.0.0.1:8080/auth/login`
- Me `curl -H "Cookie: token={token}" 127.0.0.1:8080/me`

#### Previous
- get all users `curl -X GET 127.0.0.1:8080/api/user/all`
- delete user `curl -X DELETE 127.0.0.1:8080/api/user/delete?id='id'`
- db gui tool `make check`

#### Deleted
- create user `curl -X POST -H "Content-Type: application/json" -d '{"name":"name","email":"email@gmail.com"}' 127.0.0.1:8080/api/user/add`