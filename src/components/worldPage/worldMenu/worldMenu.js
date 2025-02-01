import React from "react"
import "./worldMenu.css"

const MenuObj = ({ name, children, type}) => {
    return (
        <div className="menu-obj">
            <h2 
                className={`menu-obj-name-${type}`}
                onClick={() => document.getElementById(name)?.scrollIntoView({ behavior: "smooth" })}
            >
                {name}
            </h2>

            {children && Object.keys(children).map((childKey) => (
                <MenuObj key={childKey} name={childKey} children={children[childKey].children} type={children[childKey].type} />
            ))}
        </div>
    );
};

const WorldMenu = ({ worldData }) => {
    return (
        <div className="world-menu-norm">
            <MenuObj name={worldData.name} children={worldData.children} type={worldData.type}/>
        </div>
    );
};

export default WorldMenu;
