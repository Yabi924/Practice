import { Prisma } from "../../generated/prisma/client.ts";

export const transactions = (fastify: any) => {
    fastify.get("/", async (req: any, res: any) => {
        console.log("transaction: get");
        const {token} = req.cookies;
        if (!token)
            return res.code(401).send({error: "No token"});

        try {
            const decoded = fastify.jwt.verify(token);
            const user: Prisma.UserCreateInput = await fastify.prisma.user.findUnique({
                where: {id: decoded.id},
                include: { transactions: true }
            });
            console.dir(user.transactions);
            const transactions = user.transactions as Prisma.TransactionCreateInput[];
            return res.code(200).send({transactions});
        }
        catch (e) {
            console.error(e);
            return res.code(500).send({ error: "Server internal error"});
        }

    })

    fastify.post("/", async (req: any, res: any) => {
        console.log("transaction: post");
        const {token} = req.cookies;
        if (!token)
            return res.code(401).send({error: "No token"});

        try {
            const decoded = fastify.jwt.verify(token);
            const { amount, type, description } = req.body;
            const userId = decoded.id;

            const transaction: Prisma.TransactionCreateInput = await fastify.prisma.transaction.create({
                data: {
                    amount: parseFloat(amount),
                    type: type,
                    description: description,
                    user: { connect: {id: userId} }
                }
            })
            console.dir(transaction);
            return res.code(201).send({transaction});
        }
        catch (e) {
            console.error(e);
            return res.code(500).send({ error: "Server internal error"});
        }
    });

    fastify.delete("/", async (req: any, res: any) => {
        console.log("transaction: delete");
        const {token} = req.cookies;
        if (!token)
            return res.code(401).send({error: "No token"});

        try {
            const id = Number(req.query.id);
            if (!id || isNaN(id))
                return res.code(400).send({ error: "Invalid ID"});

            await fastify.prisma.transaction.delete({
                where: {id: id}
            })
            console.log("deleted: ", id);
            res.code(200).send({success: true});
        }
        catch (e: any) {
            console.error(e);
            if (e.code === "P2025")
                return res.code(404).send({ error: "Transaction not found" });
            return res.code(500).send({ error: "Server internal error"});
        }
    });
}
