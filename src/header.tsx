import React from 'react';

export default function Header() {
    return (
        <div className="header h-14 bg-gray-800">
            <div className="header-container h-full px-7 flex items-center">
                <div className="icon-logo-container font-bold text-white text-2xl">
                    Style Shift
                </div>
                {/* user-icon-container right */}
                <div className="user-icon-container bg-black rounded-full h-8 w-8 ml-auto cursor-pointer">
                    <img src="https://avatars.githubusercontent.com/u/1000000?s=460&u=4e4d9e8b2d0c5f7d9e8b2d0c5f7d4e8b2d0c5f7d&v=4" 
                    alt="User Icon" 
                    className="user-icon rounded-full duration-300 ease-in-out hover:opacity-50"
                    />
                </div>
            </div>
        </div>
    );
}