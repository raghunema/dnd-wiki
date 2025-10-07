import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import './worldLore.css';


const Place = ({ name, type, info, children }) => {
    return (
        <div className="place">
            <div className="place-info">
                <h1 id={name} className={`place-${type}`}>{name}</h1>
                <h2>{info}</h2>
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


const WorldLore = ({worldData}) => {
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
