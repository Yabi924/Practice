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
            const users = await fastify.prisma.user.findMany();
            // console.dir(users);
            res.send(users);
        }
        catch (e){
            console.error(e);
        }
    })

    fastify.delete("/user/delete", async (req: any, res: any) => {
        console.log("/user/delete")
        try {
            const id = Number(req.query.id);

            await fastify.prisma.user.delete({where: { id } });
            console.log("deleted ", id);
            res.send( {success: true});
        }
        catch (e) {
            console.error(e);
        }
    })
}
