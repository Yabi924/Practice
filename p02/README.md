# Env & basic setup

**Target: Register, login, auth**

---

## Learning point

- Fastify JWT Plugin (`@fastify/jwt`)
- password hash (`bcrypt`)
- token auth
- prisma operate db

---

## Practice

**Route:**
- `POST /api/register`: register new user
- `POST /api/login`: auth and return JWT
- `GET /me`: auth JWT and return user's data