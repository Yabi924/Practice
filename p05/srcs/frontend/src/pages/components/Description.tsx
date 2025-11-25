export function Description({setDes, def} : {setDes: (e: string) => void, def?: string}) {
    return (
        <div className="flex gap-2">
            <label htmlFor="description">Description:</label>
            <input 
                id="description"
                type="text"
                defaultValue={def}
                onChange={(e) => setDes(e.target.value)}
                />
        </div>
    )
}