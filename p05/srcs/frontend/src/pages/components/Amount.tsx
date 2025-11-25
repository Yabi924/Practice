export function Amount({setAmount, def = 0} : {setAmount: (e: number) => void; def?: number}) {
    return (
        <div className="
                    flex gap-2
                    bg-white-200
                "
            >
            <label htmlFor="amount">Amount:</label>
            <input 
                id="amount"
                type="number"
                defaultValue={def}
                onChange={(e) => setAmount(Number(e.target.value))} />
        </div>
    )
}