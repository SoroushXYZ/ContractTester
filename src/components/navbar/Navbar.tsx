import React, { useState } from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar: React.FC = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                {/* <a className="navbar-brand" href="#">
                Navbar
                </a> */}
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarColor02"
                aria-controls="navbarColor02"
                aria-expanded={isMenuOpen ? 'true' : 'false'}
                aria-label="Toggle navigation"
                onClick={handleMenuToggle}
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div
                className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
                id="navbarColor02"
                >
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <a className="nav-link active" href="/">
                        Home
                        <span className="visually-hidden">(current)</span>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">
                        Features
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">
                        Pricing
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">
                        About
                    </a>
                    </li>
                    <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Dropdown
                    </a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">
                        Action
                        </a>
                        <a className="dropdown-item" href="#">
                        Another action
                        </a>
                        <a className="dropdown-item" href="#">
                        Something else here
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                        Separated link
                        </a>
                    </div>
                    </li>
                </ul>
                </div>
                <div className='mx-1'>
                    <ConnectWallet />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
