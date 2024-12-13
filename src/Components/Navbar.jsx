import React, { useState } from 'react'
import { FaBars } from "react-icons/fa6";
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }


    return (
        <>
            <header>
                <div className='container'>
                    <nav>

                        <div className='logo'>
                            <img src="src\images\WORLD.png" className="logof" />

                            <h4>Kirpto Piyasası</h4>
                        </div>
                        <ul className={isOpen ? "nav-link active" : "nav-link"}>
                            <NavItem>
                                <Link to="/">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="borse">Meme Coins </Link>
                            </NavItem>
                            <NavItem>
                                <Link to="heatmap">Heatmap</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="blogs">Blogs</Link>
                            </NavItem>
                        </ul>
                        <div className="icon" onClick={toggleMenu}>
                            <FaBars />
                        </div>
                    </nav>
                </div>
            </header>
        </>

    )
}

export default Navbar