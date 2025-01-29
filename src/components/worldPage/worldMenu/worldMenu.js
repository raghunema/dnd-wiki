import React from "react";
import "./worldMenu.css";

const MenuObj = ({ name, children }) => {
    return (
        <div className="menu-obj">
            {/* Clickable title that scrolls to the corresponding section */}
            <h2 
                className="menu-obj-name"
                onClick={() => document.getElementById(name)?.scrollIntoView({ behavior: "smooth" })}
            >
                {name}
            </h2>

            {/* Recursively render children if they exist */}
            {children && Object.keys(children).map((childKey) => (
                <MenuObj key={childKey} name={childKey} children={children[childKey].children} />
            ))}
        </div>
    );
};

const WorldMenu = ({ worldData }) => {
    return (
        <div className="world-menu-norm">
            <h1 className="menu-header">Menu</h1>
            <MenuObj name={worldData.name} children={worldData.children} />
        </div>
    );
};

export default WorldMenu;
