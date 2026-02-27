import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label
                    htmlFor={id}
                    className='block text-sm font-semibold text-gray-700 mb-1.5' // ✅ FIXED — label now shows
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400 cursor-pointer ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {/* ✅ Capitalize first letter */}
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    )
})

export default Select