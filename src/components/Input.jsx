import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label
                    className='block text-sm font-semibold text-gray-700 mb-1.5'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
               
                className={`
                    w-full px-4 py-3
                    bg-white text-gray-900
                    border-2 border-gray-200
                    rounded-xl
                    outline-none
                    focus:border-blue-500 focus:ring-4 focus:ring-blue-50
                    hover:border-gray-300
                    transition-all duration-200
                    placeholder:text-gray-400
                    shadow-sm
                    ${className}
                `}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input