import React from "react";
import Sinorra from "./locationModel/sinorra";

import './home.css'

const Home = () => {  
    return (
        <div className="home">
            <div className="terrain-showcase">
                <Sinorra modelPath={"/model1/onlyLow.glb"} normalMapPath={"/model1/normalMapOne.png"} />
            </div>
        </div>
    )
 }

export default Home;