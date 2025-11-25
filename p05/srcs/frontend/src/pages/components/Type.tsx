export function Type({setType, def = "expense"} : {setType: (e: "income" | "expense") => void, def?: "income" | "expense"}) {
    return (
        <div className="flex gap-2">
            <label htmlFor="income">
            <input 
                id="income"
                name="type" 
                type="radio" 
                value="income" 
                onChange={() => setType("income")}
                defaultChecked={def === "income"} />
                Income
            </label>
            <label htmlFor="expense">
            <input 
                id="expense"
                name="type"
                type="radio"
                value="expense"
                onChange={() => setType("expense")}
                defaultChecked={def === "expense"}
                />
                Expense
            </label>
        </div>
    )
}