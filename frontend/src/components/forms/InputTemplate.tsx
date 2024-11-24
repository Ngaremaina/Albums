import React from 'react';

type InputFieldProps = {
    id: string;
    name: string;
    placeholder?: string;
    value?: string;
    label: string;
    type: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
    id,
    name,
    placeholder,
    value,
    label,
    type,
    error,
    onChange,
}: InputFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
                <input
                    type={type}
                    name={name}
                    id={id}
                    className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

export default InputField;