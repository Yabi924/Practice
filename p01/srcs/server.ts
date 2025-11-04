import fastify from "fastify";
import prismaPlugin from './plugin/prisma.ts'
import { ping } from './api/ping.ts';
import dotenv from "dotenv";
import { User } from "./api/database/User.ts";

dotenv.config();

async function initServer()
{
	console.log("Starting server...");

	const server = fastify();

	server.register(prismaPlugin);
	await server.register(User, { prefix: "/api"});
	await server.register(ping, { prefix: "/api"});

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