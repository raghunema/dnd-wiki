import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import CharacterPage from './components/characterPage/characterPage';
import Home from './components/home/home';
import WorldPage from './components/worldPage/worldPage';

function App() {
  return (
    <div className="App">
        <Router>
          <nav>
            <Link to="/">Home</Link> | <Link to="/characters">Characters</Link> | <Link to="/world-page">World Lore</Link>
          </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/characters" element={<CharacterPage />} />
              <Route path="/world-page" element={<WorldPage />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
