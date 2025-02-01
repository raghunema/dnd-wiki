import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import CharacterPage from '/Users/raghunema/dndWikiProject/dnd-wiki/src/components/characterPage/characterPage.js'
import Home from '/Users/raghunema/dndWikiProject/dnd-wiki/src/components/home/home.js';
import WorldPage from '/Users/raghunema/dndWikiProject/dnd-wiki/src/components/worldPage/worldPage';
import Timeline from '/Users/raghunema/dndWikiProject/dnd-wiki/src/components/timeline/timeline';

import './header.css'

const Header = () => {
    return (
        <div className='header'>
            <Router>
            <nav>
                <Link to="/">Home</Link> | <Link to="/characters">Characters</Link> | <Link to="/world-page">World Lore</Link> | <Link to="/timeline"> Timeline </Link>
            </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/characters" element={<CharacterPage />} />
                    <Route path="/world-page" element={<WorldPage />} />
                    <Route path="/timeline" element={<Timeline />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Header