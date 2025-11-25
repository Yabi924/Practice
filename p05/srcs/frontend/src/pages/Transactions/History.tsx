import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../Context/User";
import type { UserData } from "../../../../backend/types/UserData";
import type { Transaction } from "../../../../backend/types/Transaction";
import { apiFetch } from "../../utils";
import { EditModal } from "./Edit";
import { DeleteModal } from "./Delete";
import { ButtonGrayTouchGreen, ButtonGrayTouchRed } from "../components/ButtonCustom";

export function History({update, setUpdate}: {update: boolean, setUpdate: (b: boolean) => void}) {
    const context = useContext(TransactionContext)
    const [ transactions, setTransactions] = useState<Transaction[]>();
    const [ showModal, setShowModal] = useState(false);
    const [ data, setData] = useState<{transaction: Transaction, id: number}>();
    const [ id, setId] = useState<number>();
    const [ deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        if (!context?.user )
            return ;
        const user: UserData = context.user;
        (
            async () => {
                try {
                    setUpdate(false);
                    const data: Transaction[] = await apiFetch("api/transaction", {
                        method: "GET"
                    })
                    setTransactions(data);
                    console.log("transactions: ", data);
                    data.forEach((transaction) => {
                        console.log(transaction);
                    });
                }
                catch (e: any)
                {
                    alert(e);
                    return ;
                }
            }
        )()

    }, [update]);

    function handleDelete(id: number): void {
        setId(id);
        setDeleteModal(true);
    }

    function handleEdit(id: number): void {
        if (id < 0)
        {
            console.log("edit: idx < 0")
            return ;
        }
        (
            async () => {
                try {
                    const res = await apiFetch(`api/transaction/${id}`, {
                        method: "GET",
                    })
                    console.log("trans:", res);
                    setData({
                        transaction: res,
                        id: id
                    })
                    console.log("data", data);
                    setShowModal(true);
                }
                catch (e: any)
                {
                    alert(e);
                }
            }
        )()
    }

    return (
        <>
            {showModal && <EditModal setUpdate={setUpdate} setShowModal={setShowModal} data={data!} />}
            {deleteModal && <DeleteModal setUpdate={setUpdate} setShowModal={setDeleteModal} id={id} />}
            <div className="overflow-y-auto max-h-96 w-full space-y-1">
                {
                    transactions?.map((transaction, idx) => {
                        const id = transaction.id;
                        const amount = transaction.amount;
                        const type = transaction.type;
                        const des = transaction.description;
                        const time = transaction.createAt;

                        return (
                            <div key={idx}
                                className={`
                                        border border-grey-300 px-4 py-1 rounded
                                        flex items-center justify-between
                                        ${type === "expense" ? "bg-red-200" : "bg-green-200"}
                                    `
                                }
                            >
                                <h1>
                                    {new Date(time).toLocaleString()} {type === "income" ? "+" : "-" }{amount} {des ? `: ${des}` : ""}
                                </h1>
                                <div className="flex gap-2">
                                    <ButtonGrayTouchRed title="×" onClick={() => handleDelete(id)} />
                                    <ButtonGrayTouchGreen title="▾" onClick={() => handleEdit(id)} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}