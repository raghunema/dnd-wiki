import React from 'react';
import './characterPage.css';
// import RotatingCube from '../cube/cube';
import Character from './character/character';

const CharacterPage = () => {
    return (
        <div className='character-page'>
            <Character/>
            <Character/>
            <Character/>
            <Character/>
        </div>  
    )
}

export default CharacterPage;