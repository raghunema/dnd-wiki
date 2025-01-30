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
            <Character character={selectedCharacter} />
            <div className="character-picker">
                {characters.map((character) => (
                    <button
                        key = {character.id}
                        onClick = { () => setSelectedCharacter(character) }
                        className={`${character.name === selectedCharacter.name ? 'selected' : ''} character-button`}
                        id = {character.name}
                    >
                        {character.name}
                    </button>
                ))}
            </div>
        </div>  

    )
}

export default CharacterPage;