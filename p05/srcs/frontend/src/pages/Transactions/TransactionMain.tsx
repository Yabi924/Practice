import { useContext, useState } from "react";
import { TransactionContext } from "../../Context/User";
import { History } from "./History";
import { Charts } from "./Charts";
import { AddModal } from "./Add";

export function TransactionMain(){
    const context = useContext(TransactionContext);
    const page = context?.page;
    const showModal = context?.showModal;
    const [ update, setUpdate ] = useState<boolean>(true);

    return (
        <div 
            className="
                    w-1/3 h-96 flex justify-center
                    bg-blue-300 opacity-75
                    border border-black-300
                    rounded p-4 
                ">
                {page === "history" && <History update={update} setUpdate={setUpdate}/> }
                {page === "charts" && <Charts/> }
                {showModal && <AddModal setUpdate={setUpdate} setShowModal={context.setShowModal}/> }
        </div>
    );
}
