import bcrypt from "bcrypt";
import { loginBody, registerBody, registerBodyType } from '../schema/index.schema.ts'
import { AppError } from "../types/AppError.ts";

export const auth = async (fastify: any) => {
    fastify.post("/register",{
        schema: { body: registerBody }
    } ,async (req: any, res: any) => {
        console.log("/register");
        try {
            const { email, name, password } = req.body;

            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = await fastify.prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hashPassword
                }
            });

            console.dir(newUser);

            return res.code(201).send({
                user: {
                    id: newUser.id,
                    name: name,
                    email: email
                }
            }); //201 create success
        }
        catch (e: any) {
            if (e.code === 'P2002') //unique conflict
                throw new AppError("Email already Exists", 409);
            else
                throw e;
        }
    })

    fastify.post("/login",{
        schema: {body: loginBody}
    }, async (req: any, res: any) => {
        const {email, password} = req.body;

        const user = await fastify.prisma.user.findUnique({where: {email}})
        if (!user)
            throw new AppError("User not found", 401);

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new AppError("Invalid password", 401);

        const token = fastify.jwt.sign(
            {id: user.id},
            {expiresIn: "7d"}
        );
        res.setCookie("token", token, {
            path: "/",
        });

        return res.code(200).send({token: token});
    });
}