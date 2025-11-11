# Optimization & Secure

**Target: Make my API closer Production**

---

## Learning point

- type checking (`@fastify/type-provider-typebox`)
- Unified manage error handle (fastify.setErrorHandle())
- Prisma seed

---

## Practice

- Avoid not login user to access transaction api
- Use fastify typebox to check body
- Use fastify setErrorHandler to standardized response
- Add `auth` decorator
- Use Prisma seed to create default user account

---

## Use

### Makefile
- db & server start `make`
- server off `ctrl+c`
- db off `make down`
- db + server off + delete db `make fclean`

### Command

#### New

#### Previous

---

##### User
- Register user `curl -X POST -H "Content-Type: application/json" -d '{"name":"name","email":"example@gmail.com","password":"password"}' 127.0.0.1:8080/auth/register`
- Login `curl -X POST -H "Content-Type: application/json" -d '{"email":"example@gmail.com","password":"password"}' 127.0.0.1:8080/auth/login`
- Me `curl -H "Cookie: token={token}" 127.0.0.1:8080/me`
- get all users `curl -X GET 127.0.0.1:8080/api/user/all`
- delete user `curl -X DELETE 127.0.0.1:8080/api/user/delete?id='id'`

--- 

##### Transaction
- db gui tool `make check`
- Add transaction `curl -X POST -H "Cookie: token={token}" -H "Content-Type: application/json" -d '{"amount":"1","type":"income"}'  127.0.0.1:8080/transaction`
- Delete `curl -X DELETE -H "Cookie: token={token}" 127.0.0.1:8080/transaction?id=1`
- Update `curl -X PUT -H "Cookie: token={token}" -H "Content-Type: application/json" -d '{"amount":"10","type":"income","description":"Testing"}'  127.0.0.1:8080/transaction/1`
- Get transactions list `curl -X GET -H "Cookie: token={token}" 127.0.0.1:8080/transaction`


#### Deleted
- create user `curl -X POST -H "Content-Type: application/json" -d '{"name":"name","email":"email@gmail.com"}' 127.0.0.1:8080/api/user/add`

