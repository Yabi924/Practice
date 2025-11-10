import { Prisma } from "../../generated/prisma/client.ts";
import { AppError } from "../../types/AppError.ts";

// type: FastifyPluginAsync
export const User = async (fastify: any) => {
    fastify.get("/me", {
        preHandle: [fastify.auth]
    }, async (req: any, res: any) => {
        console.log("/me");

        const {token} = req.cookies;
        const decoded = fastify.jwt.verify(token);
        console.log(decoded);

        const user: Prisma.UserCreateInput = await fastify.prisma.user.findUnique({where: {id: decoded.id}});
        const {name, email} = user;
        const userData = {
            id: decoded.id,
            name: name,
            email: email
        }

        res.code(200).send({userData});
    })

    fastify.get("/all", async (req: any, res: any) => {
        console.log("/user/all")

        const users = await fastify.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        res.code(200).send(users);
    })

    fastify.delete("/delete", async (req: any, res: any) => {
        console.log("/user/delete")
        try {
            const id = Number(req.query.id);
            if (isNaN(id))
                throw fastify.httpErrors.badRequest("Invalid ID")

            await fastify.prisma.user.delete({where: { id } });
            console.log("deleted ", id);
            res.code(200).send();
        }
        catch (e: any) {
            if (e.code === 'P2025')
                throw new AppError("User not found", 404);
            else
                throw e;
        }
    })
}
