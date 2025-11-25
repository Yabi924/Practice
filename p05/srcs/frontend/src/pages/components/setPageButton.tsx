export function SetPageButton({setPage, title}: {setPage: () => void, title: string}){
    return (
        <div className="
                    border border-grey-400 rounded px-4 
                    text-lg 
                    hover:bg-gray-300 transition
                "
            >
            <button onClick={() => setPage()}>{title}</button>
        </div>
    )
}