import bcrypt from "bcrypt";
import { loginBody, registerBody, registerBodyType } from '../schema/index.schema.ts'

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
            console.error(e);
            if (e.code === 'P2002') //unique conflict
                res.code(409).send({ error: "Email already Exists"});
            else
                res.code(500).send({ error: "Server internal error"});
        }
    })

    fastify.post("/login",{
        schema: {body: loginBody}
    }, async (req: any, res: any) => {
        try {
            const {email, password} = req.body;
    
            const user = await fastify.prisma.user.findUnique({where: {email}})
            if (!user)
                return req.code(401).send({error: "User not found"});

            const match = await bcrypt.compare(password, user.password);
            if (!match)
                return req.code(401).send({error: "Invalid password"});

            const token = fastify.jwt.sign(
                {id: user.id},
                {expiresIn: "7d"}
            );
            res.setCookie("token", token, {
                path: "/",
            });

            return res.code(200).send({ success: true, token: token});
        }
        catch (e) {
            console.error(e);
            res.code(500).send({error: "Server internal error"});
        }
    });
}