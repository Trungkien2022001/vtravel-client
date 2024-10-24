import React, { useState } from 'react'

const Header = ({style}) => {
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen((prev) => !prev);
    };
    const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

    const toggleCurrencyDropdown = () => {
        setIsCurrencyDropdownOpen((prev) => !prev);
    };
    return (
        <div className={`${style?.height ? 'h-' + style?.height : 'h-28'} flex justify-between items-center px-12 bg-teal-500 text-lg`}>
            <div className="text-2xl font-bold text-purple-50">VTRAVEL</div>
            <div className="flex space-x-4">
                <div className="relative">
                    <button
                        onClick={toggleLanguageDropdown}
                        className='focus:outline-none text-white'
                    >
                        Language
                    </button>
                    {isLanguageDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg text-teal-500 ">
                            <ul>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Vietnamese</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Spanish</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button
                        onClick={toggleCurrencyDropdown}
                        className='focus:outline-none text-white'
                    >
                        Currency
                    </button>
                    {isCurrencyDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 z-20 bg-white border border-gray-200 rounded shadow-lg text-teal-500">
                            <ul>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">VND</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">USD</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="login text-white">Help</div>
            </div>
        </div>
    )
}

export default Header