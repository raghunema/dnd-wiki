import React from 'react';

const characters = [
    {
        name: 'Illmindel Kitolla',
        info: 'Chief of Sinnora',
        description: 'Badass as fuck'
    }
];

const NpcPage = () => {
    return (
        <div className="npc-page">
            {characters.map((character, index) => (
                <div key={index} className="character">
                    <h2>{character.name}</h2>
                    <p><strong>Info:</strong> {character.info}</p>
                    <p><strong>Description:</strong> {character.description}</p>
                </div>
            ))}
        </div>
    );
};

export default NpcPage;