export const ping = async (fastify: any) => {
    fastify.get("/ping", async (req: any, res: any) => {
        return "pong";
    })
}