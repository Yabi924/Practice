import { useState } from "react";
import { apiFetch } from "../../utils";
import { useNavigate } from "react-router-dom";
import { Email } from "../components/Email";
import { Password } from "../components/Password";
import { SubmitButton } from "../components/SubmitButton";

export function Login(){
    const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleLogin = () => {
        console.log("handleLogin has been clicked");
        if (!email || !password)
        {
            alert("Please enter Email & Password")
        }
        else 
        {
            (
                async () => {
                    try {
                        const body = JSON.stringify({
                                email: email,
                                password: password
                            });

                        const res = await apiFetch("auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: body
                        });
                        console.log("Login successfully");
                        alert("Login Successfully!");
                        navigate("/");
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
                        handleLogin();
                    }
                }>
                <Email setEmail={setEmail} />
                <Password setPassword={setPassword} />
                <SubmitButton title="Login" />
            </form>
        </div>
    );
}