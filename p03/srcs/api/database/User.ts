import { Prisma } from "../../generated/prisma/client.ts";

// type: FastifyPluginAsync
export const User = async (fastify: any) => {
    fastify.get("/me", async (req: any, res: any) => {
        console.log("/me");

        const {token} = req.cookies;
        if (!token)
            return res.code(401).send({error: "No token"});

        try {
            const decoded = fastify.jwt.verify(token);
            console.log(decoded);

            const user: Prisma.UserCreateInput = await fastify.prisma.user.findUnique({where: {id: decoded.id}});
            const {name, email} = user;
            const userData = {
                id: decoded.id,
                name: name,
                email: email
            }

            res.code(200).send(userData);
        }
        catch (e) {
            return res.code(500).send({error: "Server internal error"});
        }
    })

    fastify.get("/all", async (req: any, res: any) => {
        console.log("/user/all")
        try {
            const users = await fastify.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            res.code(200).send(users);
        }
        catch (e){
            console.error(e);
            res.code(500).send({ error: "Server internal error"});
        }
    })

    fastify.delete("/delete", async (req: any, res: any) => {
        console.log("/user/delete")
        try {
            const id = Number(req.query.id);
            if (isNaN(id))
                return res.code(400).send({ error: "Invalid ID"});

            await fastify.prisma.user.delete({where: { id } });
            console.log("deleted ", id);
            res.code(200).send();
        }
        catch (e: any) {
            console.error(e);
            if (e.code === 'P2025')
                res.code(404).send({ error: "User not found" });
            else
                res.code(500).send({ error: "Server internal error"});
        }
    })
}
