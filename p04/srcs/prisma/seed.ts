import { PrismaClient } from "../generated/prisma/client.ts";
import bcrypt from "bcrypt";

async function main()
{
    const prisma = new PrismaClient();

    try {
        await prisma.user.create({
            data: {
                name: "Yabi",
                email: "yabi@gmail.com",
                password: await bcrypt.hash("yabiyabi", 10)
            }
        })
    }
    catch (e: any)
    {
        console.log(e);
    }
}

main();