import { Prisma } from "../../generated/prisma/client.ts";

// type: FastifyPluginAsync
export const User = async (fastify: any) => {
    fastify.post("/user/add", async (req: any, res: any) => {
        console.log("/user/add");
        try {
            const body = req.body as Prisma.UserCreateInput;

            const newUser = await fastify.prisma.user.create({ data: body});

            console.dir(newUser);
            res.send(newUser);
        }
        catch (e) {
            console.error(e);
        }
    })

    fastify.get("/user/all", async (req: any, res: any) => {
        console.log("/user/all")
        try {
            // const allUser = fastify.prisma.user.
        }
        catch {

        }
    })
}
