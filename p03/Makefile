all: up install prisma r

install: 
	cd ./srcs && npm install

r: 
	cd ./srcs && npm run dev

prisma:
	cd ./srcs && npm run prisma

prismaclean:
	cd ./srcs && npm run prismaclean

down:
	docker compose down

up:
	docker compose up -d

check:
	cd ./srcs && npx prisma studio

init:
	cd ./srcs && npm install

fclean: down prismaclean
	rm -rf pgdata
	rm -rf ./srcs/generated
	rm -rf ./srcs/node_modules
	rm -rf ./srcs/prisma/migrations