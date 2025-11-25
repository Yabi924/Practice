export function Name({setName} : {setName: (e: string) => void}){

    return (
        <div className="flex gap-2">
            <label htmlFor="name">Name:</label>
            <input 
                id="name"
                className="bg-blue-200"
                type="text"
                onChange={(e) => setName(e.target.value)}
                />
        </div>
    )
}