import { Prisma } from "../../generated/prisma/client.ts";
import { TransactionPostBody } from "../../schema/transaction.schema.ts";
import { AppError } from "../../types/AppError.ts";

export const transactions = (fastify: any) => {
    fastify.get("/", async (req: any, res: any) => {
        console.log("transaction: get");
        const {token} = req.cookies;
        if (!token)
            throw new AppError("No token", 401);

        const decoded = fastify.jwt.verify(token);
        const user: Prisma.UserCreateInput = await fastify.prisma.user.findUnique({
            where: {id: decoded.id},
            include: { transactions: true }
        });
        console.dir(user.transactions);
        const transactions = user.transactions as Prisma.TransactionCreateInput[];
        return res.code(200).send({transactions});

    })

    fastify.post("/", {
        schema: { body: TransactionPostBody}
    },async (req: any, res: any) => {
        console.log("transaction: post");
        const {token} = req.cookies;
        if (!token)
            throw new AppError("No token", 401);

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
    });

    fastify.put("/:id", async (req: any, res: any) => {
        console.log("transaction: put");
        const {token} = req.cookies;
        if (!token)
            throw new AppError("No token", 401);

        try {
            const decoded = fastify.jwt.verify(token);

            const transactionId = Number(req.params.id);
            if (!transactionId)
                throw fastify.handlePrismaError.badRequest("No transaction id");
            if (isNaN(transactionId))
                throw fastify.handlePrismaError.badRequest("Invalid transaction id");

            const { amount, type, description } = req.body;
            const data: {amount?: number, type?: string, description?: string} = {};

            if (!amount && !type && !description)
                throw fastify.httpErrors.badRequest('No data to update');
            if (amount !== undefined) data.amount = parseFloat(amount);
            if (type !== undefined) data.type = type;
            if (description !== undefined) data.description = description;

            const transaction = await fastify.prisma.transaction.findUnique({
                where: {id: transactionId}
            });

            if (transaction.userId !== decoded.id)
                throw fastify.httpErrors.forbidden("Permission denied");

            const updated = await fastify.prisma.transaction.update({
                where: { id: transactionId},
                data
            })

            return res.code(200).send({updated});
        }
        catch (e: any) {
            if (e.code === "P2025")
                return res.code(404).send({ error: "Transaction not found" });
            else 
                throw e;
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
            if (e.code === "P2025")
                return res.code(404).send({ error: "Transaction not found" });
            else
                throw e;
        }
    });
}
