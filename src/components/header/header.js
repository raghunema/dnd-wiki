import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



import './header.css'

const Header = () => {
    return (
        <div className='header'>
            <nav>
                <Link to="/">Home</Link> | 
                <Link to="/characters">Characters</Link> | 
                <Link to="/world-page">World Lore</Link> | 
                <Link to="/timeline"> Timeline </Link>
            </nav>
        </div>
    )
}

export default Header