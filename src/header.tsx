import React, { useState } from 'react';
import './header.css';
import { MdDarkMode, MdWbSunny, MdSettings } from 'react-icons/md';
import {ReactComponent as LogoIcon} from './Assets/logo.svg';

export default function Header(props: { width: number, height: number}) {

    const [darkMode, setDarkMode] = useState(false);
    const [windowWidth, windowHeight] = [props.width, props.height];

    const toggleDarkMode = () => {
        if (localStorage.getItem('theme') === 'dark') {
            localStorage.removeItem('theme');
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
        else {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    }

    useState(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    });

    return (
        <div className="header header-container dark:border-[#FFFFFF]">
            <div className="header-title-container">
                <div className="header-title-icon">
                    {/* logo image */}
                    <LogoIcon
                        width={Math.max(windowHeight * 0.3, 21.76)} height={Math.max(windowHeight * 0.3, 21.76)} fill={darkMode ? "#FFFFFF" : "#000000"}
                        className='duration-0'
                    />
                </div>
                <div className="header-title-text-container">
                    <div className="header-title-text-box">
                        <div style={{fontSize: Math.max(windowHeight * 0.25, 20)}} className="header-title-text header-title-text-layout dark:text-[#FFFFFF]">
                            AI Style Shift
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-function-container">
                <div className="header-links-container">
                    <div style={{fontSize: Math.max(windowHeight * 0.2, 16), letterSpacing: windowHeight * 0.002}} className="display-flex font-style item dark:text-[#FFFFFF]">
                        Home
                    </div>
                </div>
                {/* dark mode toggle */}
                <div className="header-button-container">
                <div style={{width: Math.max(windowHeight * 0.5, 40), height: Math.max(windowHeight * 0.5, 40), borderRadius: Math.max(windowHeight * 0.25, 20)}} className="dark-mode-toggle dark:bg-[#26293B] cursor-pointer"
                    onClick={toggleDarkMode}
                >
                    <div style={{width: Math.max(windowHeight * 0.25, 20), height: Math.max(windowHeight * 0.25, 20)}} className="header-button-icon">
                        { darkMode ? <MdDarkMode size={Math.max(windowHeight * 0.25, 20)} color="#FFFFFF" /> : <MdWbSunny size={Math.max(windowHeight * 0.25, 20)} color="#000000" /> }                    
                    </div>
                </div>
                </div>
                <div className="header-button-container">
                <div style={{width: Math.max(windowHeight * 0.5, 40), height: Math.max(windowHeight * 0.5, 40)}} className="header-button-icon-container dark:bg-[#26293B]">
                    <div style={{width: Math.max(windowHeight * 0.25, 20), height: Math.max(windowHeight * 0.25, 20)}} className="header-button-icon">
                        <MdSettings size={Math.max(windowHeight * 0.25, 20)} color={darkMode ? "#FFFFFF" : "#000000"} className='duration-0' />
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

