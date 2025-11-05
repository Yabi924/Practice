# Money manage core function (CRUD)

**Target: Manage expense & income history**

---

## Learning point

- Prisma one-to-many relation (User <-> Transactions)
- CRUD API (Create, Read, Update, Delete)
- Simple query statistics

---

## Practice

**Route:**
- `GET /transactions`: get transactions history
- `POST /transactions`: upload transactions
- `PUT/PATCH /transactions?id`: update transactions
- `DELETE /transactions?id`: delete transactions

---

## Use

### Setup (base on p01)

<!-- - `/srcs/.env` -> `JWT_SECRET` -->

### Makefile
- db & server start `make`
- server off `ctrl+c`
- db off `make down`
- db + server off + delete db `make fclean`

### Command

#### New


#### Previous
- Register user `curl -X POST -H "Content-Type: application/json" -d '{"name":"name","email":"email","password":"password"}' 127.0.0.1:8080/auth/register`
- Login `curl -X POST -H "Content-Type: application/json" -d '{"email":"email","password":"password"}' 127.0.0.1:8080/auth/login`
- Me `curl -H "Cookie: token={token}" 127.0.0.1:8080/me`
- get all users `curl -X GET 127.0.0.1:8080/api/user/all`
- delete user `curl -X DELETE 127.0.0.1:8080/api/user/delete?id='id'`
- db gui tool `make check`

#### Deleted
- create user `curl -X POST -H "Content-Type: application/json" -d '{"name":"name","email":"email@gmail.com"}' 127.0.0.1:8080/api/user/add`

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYyMzQ4OTg5LCJleHAiOjE3NjI5NTM3ODl9.6YigMhH5OZO7k0rWUVYjld2owrnfJH0aEWU0yewpoGg

curl -X POST -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYyMzQ4OTg5LCJleHAiOjE3NjI5NTM3ODl9.6YigMhH5OZO7k0rWUVYjld2owrnfJH0aEWU0yewpoGg" -H "Content-Type: application/json" -d '{"amount":"17.0","type":"income"}'  127.0.0.1:8080/transaction

curl -X GET -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYyMzQ4OTg5LCJleHAiOjE3NjI5NTM3ODl9.6YigMhH5OZO7k0rWUVYjld2owrnfJH0aEWU0yewpoGg" 127.0.0.1:8080/transaction

curl -X DELETE -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYyMzQ4OTg5LCJleHAiOjE3NjI5NTM3ODl9.6YigMhH5OZO7k0rWUVYjld2owrnfJH0aEWU0yewpoGg" 127.0.0.1:8080/transaction?id=1
