import React, { useState } from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';

const Navbar: React.FC = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToFooter = () => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
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
                    <Link className="nav-link active" href="/">
                        Home
                        <span className="visually-hidden">(current)</span>
                    </Link>
                    </li>
                    <li className="nav-item">
                    <a onClick={scrollToFooter} className="nav-link active" style={{cursor: "pointer"}}>
                        Contact Me
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="https://github.com/SoroushXYZ/ContractTester">
                        <FaGithub size={30} />
                    </a>
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
