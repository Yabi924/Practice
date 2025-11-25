import { useState } from "react";
import type { Transaction } from "../../../../backend/types/Transaction";
import { Modal } from "../components/Modal";
import { apiFetch } from "../../utils";
import { Amount } from "../components/Amount";
import { Type } from "../components/Type";
import { Description } from "../components/Description";
import { SubmitButton } from "../components/SubmitButton";

function Edit({ onSuccess, setUpdate, data }: { 
        onSuccess?: () => void, 
        setUpdate: (b: boolean) => void, 
        data?: {transaction: Transaction, id: number} 
    }) 
{
    if (!data)
        return ;

    const [ amount, setAmount ] = useState<number>(data.transaction.amount);
    const [ type, setType ] = useState<"income" | "expense">(data.transaction.type);
    const [ description, setDescription ] = useState<string | undefined>(data.transaction.description);

    const handleSubmit = () => {
        if (!amount || !type)
        {
            console.log("missing amount or type");
            return ;
        }
        (
            async () =>  {
                try {
                    const body = JSON.stringify({
                        amount: amount,
                        type: type,
                        description: description
                    })

                    console.log("id: ", data.id);
                    await apiFetch(`api/transaction/${data.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: body,
                    })
                    console.log("Edit successfully");
                    onSuccess?.();
                    setUpdate(true);
                }
                catch (e: any)
                {
                    alert(e);
                }
            }
        )()
    }

    return (
        <form
            className="
                    border border-grey-200 px-4
                    justify-center
                    flex flex-col gap-8
                "
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            >
            <Amount setAmount={setAmount} def={amount} />
            <Type setType={setType} def={type}/>
            <Description setDes={setDescription} def={description}/>
            <SubmitButton title="Edit" />
        </form>
    )
}

export function EditModal({ setUpdate, setShowModal, data}: {
        setUpdate: (b: boolean) => void,
        setShowModal?: (b: boolean) => void
        data?: {transaction: Transaction, id: number}
    })
{
    return (
        <Modal 
            isOpen={true}
            onClose={() => setShowModal?.(false)}
            title="Edit Transaction"
        >
            <Edit setUpdate={setUpdate} onSuccess={() => setShowModal?.(false)} data={data}  />
        </Modal>
    )
}