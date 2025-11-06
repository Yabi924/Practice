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
- `GET /transaction`: get transaction history
- `POST /transaction`: upload transaction
- `PUT/PATCH /transaction/:id`: update transaction
- `DELETE /transaction?id`: delete transaction

---

## Use

### Makefile
- db & server start `make`
- server off `ctrl+c`
- db off `make down`
- db + server off + delete db `make fclean`

### Command

#### New
- Add transaction `curl -X POST -H "Cookie: token={token}" -H "Content-Type: application/json" -d '{"amount":"1","type":"income"}'  127.0.0.1:8080/transaction`
- Delete `curl -X DELETE -H "Cookie: token={token}" 127.0.0.1:8080/transaction?id=1`
- Update `curl -X PUT -H "Cookie: token={token}" -H "Content-Type: application/json" -d '{"amount":"10","type":"income","description":"Testing"}'  127.0.0.1:8080/transaction/1`
- Get transactions list `curl -X GET -H "Cookie: token={token}" 127.0.0.1:8080/transaction`

#### Previous
- Register user `curl -X POST -H "Content-Type: application/json" -d '{"name":"name","email":"email","password":"password"}' 127.0.0.1:8080/auth/register`
- Login `curl -X POST -H "Content-Type: application/json" -d '{"email":"email","password":"password"}' 127.0.0.1:8080/auth/login`
- Me `curl -H "Cookie: token={token}" 127.0.0.1:8080/me`
- get all users `curl -X GET 127.0.0.1:8080/api/user/all`
- delete user `curl -X DELETE 127.0.0.1:8080/api/user/delete?id='id'`
- db gui tool `make check`

#### Deleted
- create user `curl -X POST -H "Content-Type: application/json" -d '{"name":"name","email":"email@gmail.com"}' 127.0.0.1:8080/api/user/add`

