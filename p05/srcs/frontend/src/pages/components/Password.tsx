export function Password({setPassword} : {setPassword: (e: string) => void}){

    return (
        <div className="flex gap-2">
            <label htmlFor="password">Password:</label>
            <input 
                id="password"
                className="bg-blue-200"
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                />
        </div>
    )
}