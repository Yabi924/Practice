import Type, { Static } from "typebox";

export const TransactionPostBody = Type.Object({
    amount: Type.Number(),
    type: Type.String(),
    description: Type.Optional(Type.String())
});

export type TransactionPostBodyType = Static<typeof TransactionPostBody>;

export const TransactionPutBody = Type.Object({
    amount: Type.Optional(Type.Number()),
    type: Type.Optional(Type.String()),
    description: Type.Optional(Type.String())
});

export type TransactionPutBodyType = Static<typeof TransactionPutBody>;
