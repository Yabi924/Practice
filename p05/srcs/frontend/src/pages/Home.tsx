import { useEffect, useState } from "react"
import type { UserData } from '../../../backend/types/UserData'
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils";
import { TransactionMain } from "./Transactions/TransactionMain";
import { TransactionContext } from "../Context/User";
import { SetPageButton } from "./components/setPageButton";

export function Home(){
    const navigate = useNavigate();
    const [ me, setMe ] = useState<UserData | undefined>(undefined);
    const [ page, setPage ] = useState<"history" | "charts" | "home">("home");
    const [ showModal, setShowModal ] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    const me: UserData = await apiFetch("api/user/me");
                    setMe(me);
                }
                catch (e: any)
                {
                    console.error(e);
                    alert(e);
                    navigate("/auth");
                }
            }
        )()
    }, []);

    return (
        <div
            className="
                    flex flex-col items-center
                    bg-cover bg-center min-h-screen
                    gap-8 pt-8
                "
            style={{backgroundImage: 'url(public/bg/bg_afnoon.jpg)'}}
        >
            <div className="border border-grey-400 rounded px-4 flex gap-10 p-4">
                <SetPageButton setPage={() => setPage("home")} title="home" />
                <SetPageButton setPage={() => setPage("history")} title="history" />
                {/* <SetPageButton setPage={() => setPage("charts")} title="charts" /> */}
            </div>
            <div 
                className="
                        h-10 flex items-center 
                        border border-grey-400 rounded px-4 
                        text-lg 
                        hover:bg-gray-300 transition cursor-pointer
                    "
                >
                <button onClick={() => setShowModal(true)}>Add Transaction</button>
            </div>
            <TransactionContext.Provider value={{
                            user: me, 
                            page: page, 
                            showModal: showModal, 
                            setShowModal: setShowModal
                        }
                    }
                >
                <TransactionMain />
            </TransactionContext.Provider>
        </div>
    )
}
