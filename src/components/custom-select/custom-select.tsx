'use client'
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './custom-select.css'; // Import CSS file for styling
import { AnimatePresence, motion } from 'framer-motion';

const CustomSelect: React.FC<{ options: SelectOptionInterface[], placeholder: string, name: string, dropdownOpened: string, onChange: React.Dispatch<React.SetStateAction<any>>, setDropdownOpened: React.Dispatch<React.SetStateAction<string>> }> = ({ options, placeholder, onChange, name, dropdownOpened, setDropdownOpened }) => {
    const [selectedOption, setSelectedOption] = useState<{ label: string, value: string } | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option: { label: string, value: string }) => {
        setSelectedOption(option);
        setDropdownOpened('');
        setIsOpen(false);
        onChange(option);
    };

    return (
        <div className="relative w-full">
            <Toaster />
            <div
                className="p-2 cursor-pointer border border-[#8b8989] border-opacity-50 px-2 py-2 outline-none rounded-lg flex justify-between items-center"
                onClick={() => {
                    if (!isOpen) {
                        if (dropdownOpened === "") {
                            setIsOpen(true);
                            setDropdownOpened(name);
                        } else {
                            toast.error("Close other dropdown first!!")
                        }
                    } else {
                        setDropdownOpened('');
                        setIsOpen(false);
                    }
                }}
            >
                <p className='text-[#9ca3af]'>{selectedOption ? selectedOption.label : placeholder}</p>
                <svg className="w-4 h-4 mt-px ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="options bg-white z-10 max-h-[300px] overflow-scroll"
                    >
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`option ${selectedOption === option ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;
