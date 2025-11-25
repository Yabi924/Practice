export interface Transaction {
    id: number;
    amount: number;
    type: "expense" | "income";
    description?: string;
    createAt: Date;
}