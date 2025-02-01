import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/header/header';
import CharacterPage from '/Users/raghunema/dndWikiProject/dnd-wiki/src/components/characterPage/characterPage.js'
import Home from '/Users/raghunema/dndWikiProject/dnd-wiki/src/components/home/home.js';
import WorldPage from '/Users/raghunema/dndWikiProject/dnd-wiki/src/components/worldPage/worldPage';
import Timeline from '/Users/raghunema/dndWikiProject/dnd-wiki/src/components/timeline/timeline';

function App() {
  return (
    <div className="App">
        <Router>
          <Header/>
          <div className="main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<CharacterPage />} />
                <Route path="/world-page" element={<WorldPage />} />
                <Route path="/timeline" element={<Timeline />} />
            </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
