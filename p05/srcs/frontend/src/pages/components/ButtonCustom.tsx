export function ButtonGrayTouchRed({title, onClick}: {title: string, onClick: () => void}) {
    return (
        <button
            className="
                    border border-black px-3 rounded 
                    bg-gray-200
                    hover:text-red-500 text-2xl 
                "
            onClick={onClick}
        >
        {title}
        </button>
    )
}   

export function ButtonGrayTouchGreen({title, onClick}: {title: string, onClick: () => void}) {
    return (
        <button
            className="
                    border border-black px-3 rounded 
                    bg-gray-200
                    hover:text-green-500 text-2xl
                "
            onClick={onClick}
        >
        {title}
        </button>
    )
}   