all: up init

backend: prisma prismaSeed
	cd ./srcs/backend && npm run dev

frontend:
	cd ./srcs/frontend && npm run dev

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
	cd ./srcs/frontend && npm install

fclean: prismaclean down 
	rm -rf pgdata
	rm -rf ./srcs/backend/generated
	rm -rf ./srcs/backend/node_modules
	rm -rf ./srcs/backend/prisma/migrations