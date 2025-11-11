import fastify from "fastify";
import prismaPlugin from './plugin/prisma.ts'
import dotenv from "dotenv";
import { User } from "./api/database/User.ts";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { auth } from "./api/auth.ts";
import { transactions } from "./api/database/Transactions.ts";
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Prisma } from "./generated/prisma/client.ts";
import { AppError } from "./types/AppError.ts";

dotenv.config();

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
if (!JWT_SECRET)
{
	console.error("env missing: JWT_SECRET");
	process.exit(1);
}

function errorHandler(error: any, req: any, res: any): void {
	console.error("Server Throw: ", error);

	if (error.code?.startsWith("P")) //prisma error
		return res.code(400).send({
			error: `Database Error: ${error.code}`
	})

	const status: number = error.statusCode || 500;
	res.code(status).send({
		error: error.message || "Server Internal Error"
	})
}

async function initServer()
{
	console.log("Starting server...");

	const server = fastify().withTypeProvider<TypeBoxTypeProvider>();
	server.setErrorHandler(errorHandler);

	server.register(fastifyCookie);
	server.register(fastifyJwt, { secret: JWT_SECRET! });
	server.decorate('auth', async (req: any, res: any) => {
		await req.jwtVerify();
	})

	server.register(prismaPlugin);
	await server.register(User, { prefix: "/api/user"});
	await server.register(auth, { prefix: "/auth"});
	await server.register(transactions, { prefix: "/transaction"});

	return server;
}

async function main()
{
	const server = await initServer();

	try {
		const address = await server.listen({ port: 8080, host: "0.0.0.0" });
  		console.log(`✅ Server listening at ${address}`);
	}
	catch (e){
		console.error(e)
		process.exit(1)
	}

}

main();