export function SubmitButton({ title } : { title: string } ){
    return (
        <button
            type="submit"
            className="
                    h-10 w-20 text-lg
                    border border-black-200 border-2 rounded 
                    hover:shadow-lg mx-auto transition
                " 
            >{title}
        </button>
    )
}