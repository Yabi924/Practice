import { useState } from "react"
import { Register } from "./Register";
import { Login } from "./Login";

export function Auth(){
    const [page, setPage ] = useState<"login" | "register">("login");

    return (
        <div 
            className="
                flex flex-col items-center justify-center 
                min-h-screen gap-4
                bg-cover bg-center"
            style={{backgroundImage: 'url(public/bg/bg_day.jpg)'}}
        >
            <h1 
                className="text-xl bg-blue-400 rounded p-1 opacity-75"
                >{page === "register" ? "Register" : "Login"}
            </h1>
            <div className="opacity-75">
                <div className="border border-gray-300 rounded p-6">
                    {page === "register" ? <Register setPage={() => setPage("login")}  /> : <Login />}
                </div>
            </div>
            <button
                className="
                        bg-black-200 border border-gray-400 rounded
                        px-4 py-2
                        hover:bg-gray-300 transition
                    "
                onClick={() => page === "register" ? setPage("login") : setPage("register")}
            >
                {
                    page === "register" ?  "To Login" : "To Register"
                }
            </button>
        </div>
    )
}