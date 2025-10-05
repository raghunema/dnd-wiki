import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/header/header';
import CharacterPage from './components/characterPage/characterPage'
import Home from './components/home/home'
import WorldPage from './components/worldPage/worldPage';
import Timeline from './components/timeline/timeline';
import NpcMainPage from './components/npcs/npcMainPage';
import NpcPage from './components/npcs/npcPage';
import AdminPage from './components/admin/adminPage';
import LoginPage from './components/admin/login';

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
                <Route path="/npcs/" element={<NpcMainPage />}/> 
                <Route path="/npcs/:npcSlug" element={<NpcPage />} />
                <Route path="/admin" element={<AdminPage/> }/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
