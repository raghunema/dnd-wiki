import React, {useState} from 'react';
import './worldLore.css';

const worldData = {
    name: "Mathura",
    type: "Planet",
    children: {
        "Kiresth": {
            type: "Continent",
            children: {
                "Safil": {
                    type: "Country",
                    children: {
                        "Idara": {
                            type: "Tribe",
                            info: "The Largest"
                        },
                        "Dubey": {
                            type: "Tribe",
                            info: "The Most Powerful"
                        },
                        "Malga": {
                            type: "Tribe",
                            info: "The Most Advanced"
                        },
                        "Chadri":{
                            type: "Tribe",
                            info: "The Most Isolated"
                        }
                    }
                }
            }
        }, 
        "Kalith": {
            type: "Continent",
            children: {
                "The Porshithi Mountain Range": {
                    type: "Country"
                },
                "City of Petr": {
                    type: "City"
                },
                "Island of Ventosa": {
                    type: "Island"
                }
            }
        }

    } 
}

const Place = ({ name, type, info, children }) => {
    return (
        <div className="place">
            <div className="place-info">
                <h1 className={`place-${type}`}>{name} ({type})</h1>
                <h3>{info}</h3>
            </div>
            {children && (
                <div className="children">
                    {Object.keys(children).map((childKey) => (
                        <Place
                            key={childKey}
                            name={childKey}
                            type={children[childKey].type}
                            info={children[childKey].info}
                            children={children[childKey].children}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


const WorldLore = () => {
    return (
        <div className="world-lore">
            <Place
                name={worldData.name}
                type={worldData.type}
                info={worldData.info}
                children={worldData.children}
            />
        </div>
    );
};

export default WorldLore;