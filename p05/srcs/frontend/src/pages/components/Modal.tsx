import { ReactNode } from "react";

export function Modal({ 
    isOpen, 
    onClose, 
    title, 
    children 
}: { 
    isOpen: boolean,
    onClose: () => void,
    title: string,
    children: ReactNode
}) {
    if (!isOpen) return null;

    return (
        <div 
            className="
                    fixed inset-0 bg-black bg-opacity-50 
                    flex items-center justify-center z-50
                "
            onClick={onClose}
        >
            <div 
                className="bg-white bg-opacity-80 rounded p-6 w-96 z-50"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center items-center mb-4 relative">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="text-2xl hover:text-red-500 absolute right-0"
                    >
                        ×
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
