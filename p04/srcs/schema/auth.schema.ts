import Type, { Static } from "typebox";

export const registerBody = Type.Object({
    email: Type.String({format: "email"}),
    name: Type.String({minLength: 2}),
    password: Type.String({minLength: 8})
});

export type registerBodyType = Static<typeof registerBody>;

export const loginBody = Type.Object({
    email: Type.String({format: "email"}),
    password: Type.String({minLength: 8})
});

export type loginBodyType = Static<typeof loginBody>;
