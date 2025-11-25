# Time to build Frontend

**Target: Access API and show result**

---

## Learning point

- React TypeScript (Vite) to handle frontend 
- Frontend login status manage
- Form & Sheet display

---

## Practice

- Page:
    - `/`: home page: manage transactions, show transactions history
    - `/auth`
- Transaction Add/Delete/Edit
- User account Register/Login/Delete

---

## Use

### Makefile
- db & server start `make`
- server off `ctrl+c`
- db off `make down`
- db + server off + delete db `make fclean`

### Command

---

##### User
- Register user `curl -X POST -H "Content-Type: application/json" -d '{"name":"name","email":"example@gmail.com","password":"password"}' 127.0.0.1:8080/auth/register`
- Login `curl -X POST -H "Content-Type: application/json" -d '{"email":"example@gmail.com","password":"password"}' 127.0.0.1:8080/auth/login`
- Me `curl -H "Cookie: token={token}" 127.0.0.1:8080/api/user/me`
- get all users `curl -X GET 127.0.0.1:8080/api/user/all`
- delete user `curl -X DELETE 127.0.0.1:8080/api/user/delete?id='id'`

--- 

##### Transaction
- db gui tool `make check`
- Add transaction `curl -X POST -H "Cookie: token={token}" -H "Content-Type: application/json" -d '{"amount":"1","type":"income"}'  127.0.0.1:8080/api/transaction`
- Delete `curl -X DELETE -H "Cookie: token={token}" 127.0.0.1:8080/api/transaction?id=1`
- Update `curl -X PUT -H "Cookie: token={token}" -H "Content-Type: application/json" -d '{"amount":"10","type":"income","description":"Testing"}'  127.0.0.1:8080/api/transaction/1`
- Get transactions list `curl -X GET -H "Cookie: token={token}" 127.0.0.1:8080/api/transaction`
- Get transaction by id `curl -X GET -H "Cookie: token={token}" 127.0.0.1:8080/api/transaction/1`
