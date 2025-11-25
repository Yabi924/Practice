import { apiFetch } from "../../utils";
import { Modal } from "../components/Modal";

export function DeleteModal({ setUpdate, setShowModal, id}: {
        setUpdate: (b: boolean) => void,
        setShowModal?: (b: boolean) => void
        id?: number
    })
{

    function handleDelete(id?: number): void {
        if (id === undefined || id < 0)
        {
            console.log("delete: idx < 0")
            return ;
        }
        (
            async () => {
                try {
                    const res = await apiFetch(`api/transaction?id=${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({})
                    })
                    setUpdate(true);
                    setShowModal?.(false);
                    console.log("delete successfully, idx: ", id);
                }
                catch (e: any)
                {
                    alert(e);
                }
            }
        )()
    }

    return (
        <Modal isOpen={true} onClose={() => setShowModal?.(false)} title="Confirm Delete?">
            <div className="
                    border border-grey-200 px-4
                    justify-center
                    flex gap-8">
                <button 
                    className="
                            border px-4 rounded
                            hover:text-red-500
                            bg-gray-400
                        "
                    onClick={() => handleDelete(id)}
                >
                Delete
                </button>
                <button 
                    className="
                            border px-4 rounded
                            hover:text-blue-500
                            bg-gray-400
                        "
                    onClick={() => setShowModal?.(false)}
                >
                Cancel
                </button>

            </div>
        </Modal>
    )
}