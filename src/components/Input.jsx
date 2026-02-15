import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label 
                    className='block text-sm font-medium text-gray-700 mb-2' 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`w-full px-0 py-3 bg-transparent text-gray-900 border-0 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input