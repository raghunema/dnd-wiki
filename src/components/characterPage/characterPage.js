import React, { useState } from 'react';
import './characterPage.css';
import Character from './character/character';

const characters = [
    {id: 0, name: "Darius", information: "Human Hexblade", model: "models/darius.glb"},
    {id: 1, name: "Vania", information: "Elf, Cleric of Tyr", model: "models/darius.glb"},
    {id: 2, name: "Constantenius", information: "Human Fighter", model: "models/darius.glb"},
    {id: 3, name: "Charity Stonespire", information: "Teifling Theif", model: "models/darius.glb"},
]

const CharacterPage = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(characters[0])

    return (
        <div className='character-page'>
            <Character setSelectedCharacter={setSelectedCharacter}/>
            <div style={{ marginTop: "20px" }}>
                <h2>Selected Object Info:</h2>
                {selectedCharacter ? (
                    <pre>{JSON.stringify(selectedCharacter, null, 2)}</pre>
                    ) : (
                <p>No object selected</p>
                )}
            </div>
        </div>  

    )
}

export default CharacterPage;