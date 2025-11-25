import { useState } from "react";
import { Email } from "../components/Email";
import { Password } from "../components/Password";
import { Name } from "../components/UserName";
import { SubmitButton } from "../components/SubmitButton";
import { apiFetch } from "../../utils";

export function Register({setPage}: {setPage: () => void}){
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ name, setName ] = useState("");

    const handleRegister = () => {
        if (!email || !password || !name)
        {
            alert("Please enter User Name & Email & Password")
        }
        else
        {
            (
                async () => {
                    try {
                        const body = JSON.stringify({
                            name: name,
                            email: email,
                            password: password
                        });

                        const res = await apiFetch("auth/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: body
                        })
                        console.log("Register successfully");
                        alert("Register Successfully!");
                        setPage();
                    }
                    catch (e: any)
                    {
                        alert(e);
                    }
                }
            )()
        }
    }

    return (
        <div className="flex flex-col gap-5 bg-blue-300 p-4 rounded">
            <form
                className="flex flex-col gap-2" 
                onSubmit={(e) => {
                        e.preventDefault();
                        handleRegister();
                    }
                }>
                <Name setName={setName} />
                <Email setEmail={setEmail} />
                <Password setPassword={setPassword} />
                <SubmitButton title="Register" />
            </form>
        </div>
    );
}