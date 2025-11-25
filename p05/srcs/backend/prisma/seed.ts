import { PrismaClient } from "../generated/prisma/client.ts";
import bcrypt from "bcrypt";

async function main()
{
    const prisma = new PrismaClient();

    try {
        const find = prisma.user.findUnique({where: {id: 1}});
        if (!find)
        {
            await prisma.user.create({
                 data: {
                     name: "Yabi",
                     email: "yabi@gmail.com",
                     password: await bcrypt.hash("yabiyabi", 10)
                 }
            })
            console.log("Seed: Create user successfully!");
        }
    }
    catch (e: any)
    {
        console.log(e);
    }
}

main();