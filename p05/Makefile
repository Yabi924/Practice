all: up backend frontend

backend: install prisma prismaSeed r

frontend:
	cd ./srcs/frontend && npm install
	cd ./srcs/frontend && npm run dev

install: 
	cd ./srcs/backend && npm install

r:
	cd ./srcs/backend && npm run dev

prisma:
	cd ./srcs/backend && npm run prisma

prismaSeed:
	cd ./srcs/backend && npm run prismaSeed

prismaclean:
	cd ./srcs/backend && npm run prismaClean

down:
	docker compose down

up:
	docker compose up -d

check:
	cd ./srcs/backend && npx prisma studio

init:
	cd ./srcs/backend && npm install

fclean: prismaclean down 
	rm -rf pgdata
	rm -rf ./srcs/backend/generated
	rm -rf ./srcs/backend/node_modules
	rm -rf ./srcs/backend/prisma/migrations