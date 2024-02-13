import React from 'react';
import './header.css';

import logo from './Assets/logo.svg';
import setting from './Assets/setting.svg';

export default function Header() {
    return (
        <div className="header header-container">
            <div className="header-title-container">
                <div className="header-title-icon">
                    {/* logo image */}
                    <img src={logo} className="header-title-icon-svg" alt="logo" />
                </div>
                <div className="header-title-text-container">
                    <div className="header-title-text-box">
                        <div className="header-title-text header-title-text-layout">
                            AI Style Shift
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-function-container">
                <div className="header-links-container">
                    <div className="display-flex font-style item">
                        Home
                    </div>
                </div>
                {/* dark mode toggle */}
                {/* <div className="header-dark-mode-toggle-container">
                    <div className="header-dark-mode-toggle">
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div> */}
                <div className="header-button-container">
                <div className="header-button-icon-container">
                    <div className="header-button-icon">
                        <img src={setting} className="header-button-icon-svg" alt="setting" />
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

