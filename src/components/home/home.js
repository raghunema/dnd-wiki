import { useEffect, React, use, useState} from "react";
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import Sinorra from "./locationModel/sinorra";
import SinorraTwo from "./locationModel/sinorraTwo";
import Map from "./locationModel/map";

import { getEvents } from '../../backendCalls/api'
import './home.css'


const Home = () => {  

    const [worldEvents, setEvents] = useState([])
    const [sliderMarks, setSliderMarks] = useState({})
    const [currentEvent, setCurrentEvent] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)

    useEffect(() => {

        const fetchEvents = async () => {
            const allEvents = await getEvents({});
            setEvents(allEvents);

            const marks = {};
            allEvents.forEach((oneEvent, i) => {
                marks[i] = oneEvent.name; 
            });

            setSliderMarks(marks);
            setCurrentEvent(allEvents[0])
            console.log(currentEvent)
        };

        fetchEvents();
    }, [])

    const handleSliderChange = (val) => {
        console.log(val)
        const newEvent = worldEvents[val]
        setCurrentEvent(newEvent)
        console.log("Selected event:", newEvent.name);
    }

    if (worldEvents.length === 0 || !Object.keys(sliderMarks).length) {
        return (<div><h1>Getting marks</h1></div>)
    }

    return (
        <div className="home">
            <div className="terrain-showcase">
                <Map setCurrentLocation={setCurrentLocation}/>
            </div>

            <Slider
                min={0}
                max={worldEvents.length-1}
                step={1}
                marks={sliderMarks}
                onChange={handleSliderChange}
                // dotStyle={{
                //     backgroundColor: "#eeb74a",
                //     height: 12,
                //     width: 12,
                //     marginTop: -7,
                // }}
                railStyle={{ backgroundColor: "transparent" }}
                trackStyle={{ backgroundColor: "transparent" }}   
            />

            <div style={{ marginTop: "80px" }}>
                {currentEvent.name}
                <div>
                    {currentEvent.description}
                </div>
                <div>
                    {currentLocation}
                </div>
            </div>

        </div>
    )
}



export default Home;