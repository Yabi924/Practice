import fp from 'fastify-plugin'
import { PrismaClient } from '../generated/prisma/client.ts'

export default fp(async (fastify) => {
	const prisma = new PrismaClient();

	fastify.decorate('prisma', prisma)

	fastify.addHook('onClose', async (app) => {
		await app.prisma.$disconnect()
	})
})