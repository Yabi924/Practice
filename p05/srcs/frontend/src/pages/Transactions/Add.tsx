import { useState } from "react";
import { Amount } from "../components/Amount";
import { Description } from "../components/Description";
import { SubmitButton } from "../components/SubmitButton";
import { Type } from "../components/Type";
import { apiFetch } from "../../utils";
import type { Transaction } from "../../../../backend/types/Transaction";
import { Modal } from "../components/Modal";

export function AddModal({ setUpdate, setShowModal }: {
        setUpdate: (b: boolean) => void,
        setShowModal?: (b: boolean) => void
    })
{
    return (
        <Modal 
            isOpen={true} 
            onClose={() => setShowModal?.(false)} 
            title="Add Transaction" 
        >
            <Add setUpdate={setUpdate} onSuccess={() => setShowModal?.(false)} />
        </Modal>
    )
}

export function Add({ onSuccess, setUpdate }: { onSuccess?: () => void, setUpdate: (b: boolean) => void }){
    const [ amount, setAmount ] = useState<number>();
    const [ type, setType ] = useState<"income" | "expense">("expense");
    const [ description, setDescription ] = useState<string | undefined>();

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

                    const res: Transaction = await apiFetch("api/transaction", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: body,
                    })
                    // console.log(res);
                    console.log("Add successfully");
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
            <Amount setAmount={setAmount} />
            <Type setType={setType} />
            <Description setDes={setDescription} />
            <SubmitButton title="Add" />
        </form>
    )
}