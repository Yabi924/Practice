all: prisma r

r: 
	cd ./srcs && npm run dev

prisma:
	cd ./srcs && npm run prisma

down:
	docker compose down

up:
	docker compose up -d

check:
	cd ./srcs && npx prisma studio