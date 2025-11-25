export function Email({setEmail} : {setEmail: (e: string) => void}){

    return (
        <div className="flex gap-2">
            <label htmlFor="email">Email:</label>
            <input 
                id="email"
                className="bg-blue-200"
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                />
        </div>
    )
}