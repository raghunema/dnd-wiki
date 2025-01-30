import React from 'react'
import WorldLore from './worldLore/worldLore'
import WorldMenu from './worldMenu/worldMenu'
import './worldPage.css'

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
                            info: "The largest celestial body that orbits the moon, the soft gray light encompasses all. These people’s chosen companions are Elephants. They emphasize a strong moral standing, revolving around wisdom and virtuosity, but their culture is largely dictated by tradition. They follow a large open where anyone is allowed to voice their thoughts, but their attention to moral detail often causes a lack of responsive action. They are known for their philosophers and strong focus on horticulture."
                        },
                        "Dubey": {
                            type: "Tribe",
                            info: "The older middle child, the golden-red of Dubey reflects on this tribe as both social and political tend to lean toward fast decisive action, not wanting to wait to miss crucial opportunities. As such this tribe is led by an elder who is elected, determined by their will power and experience. This tribe's chosen animal companion are the Thunder-Lions, vicious but fair, and never unheard. Heavily nomadic and having extreme loyalty, they produce the greatest warriors. Their culture revolves around great physical feats, but also physical expression such as dancing and singing."
                        },
                        "Malga": {
                            type: "Tribe",
                            info: "The green light of Malga shines upon these people, though the smallest celestial body, they are never overlooked. Nomadic and stationary, this culture is dominated by balance, not right and wrong, but by order and chaos. They tend to their land, and once Malga calls, they are ready to move again. Their chosen animal companions are the Nagas , and never is any resource wasted. Experts in survival, hunting, tracking, and using the land to their benefit, they brew potent potions and decorate the land with sculptures and landmarks."
                        },
                        "Chadri":{
                            type: "Tribe",
                            info: "The youngest celestial body, and the second largest, the blue light of Chadri often only reaches the mountains. Their social belief lies in righteousness and divine guidance, a union of logic and spirituality. With the eagles, these people build grand towers and perches to study the stars and their movements. Well versed in mathematics and astronomy, they use their scientific prowess to innovate and predict their gods's wants and needs."
                        }
                    },
                    info: "Safil is an area of ever longing field, where the orc tribes live. Each tribe has a long held respect and peace with each other, with each tribe having a form and function in their civilization. As their civilizations revolve around the night sky and the stories that are told through celestial movement, a tribe’s spiritual and ideological function is an earthly representation of a given celestial body. The Moon is their primary deity, birthed from the sun it was the first to gain consciousness, with the four spheres that orbit the Moon being the first children of the moon, and with the stars akin to angels and minor gods. The star guides, the civilizations high priests, ride on their massive mounts following the patterns in the moons, while moon guides build ever growing towers to reach a clearer vision of the sky. Their culture is in symbiosis with the giants that roam these lands, though they are rarely seen.  Some tribes are stationary while others are nomadic, but each also keeps a specific animal companion. Though tribes may have different animal companions, the companions are seen as part of their family."
                }
            }, 
            info: "Kiresth is the northern continent, where the elves, ents, tabaxi, orcs, and other such races dwell. The most populated geographical area is the peninsula of Baraq, the home of the wood elves, as well as other races."
        }, 
        "Kalith": {
            type: "Continent",
            children: {
                "The Porshithi Mountain Range": {
                    type: "Country",
                    info: "Porsithi is the mountain range that cuts the southern continent in half, littered with many different cities and settlements that dwell within. Though it is one of the most inhabited places in the world, it does not mean it is well explored or safe for travelers, but quite the opposite. The harsh conditions and beasts that lurk the land have caused the people to carve out fortresses within the mountains. Dwarves, Halflings, and Humans are the most common type of people, but there are a variety of other races that can be found wandering the halls. The major resource is Loturim, a rare mineral that has a unique glint and a resonance with magic, but it has always been dangerous to mine and needs to be handled with care."
                },
                "City of Petr": {
                    type: "City",
                    info: "Petr is the major city in Amai, the center of all trade that occurs in Kalith. It is a melting pot of all races and cultures (this is where the party will be starting). Due to the huge population and economic boom, as well as the inability of the local government to keep up with the times, has unfortunately left many innocents behind to be swallowed by the wave of change, and sprouted many ‘businesses’ that take advantage of such innocents. Politically, Petr is considered a neutral city state with the monarchy acting with absolute authority, however they do not take significant action within the city unless significant harm towards the status quo and business relations… The monarchy has always held a position of neutrality in foreign affairs and as such often acts as arbitrators. No significant military action has ever been taken against Petr, as such the military power of Petr is significantly weaker than what would be expected, though it makes up its geopolitical power easily in terms of trade and spending power. "
                },
                "Island of Ventosa": {
                    type: "Island",
                    info: "A large coral reef that lies close to the surface, as big as an island. Some parts of it jut out of the water, but the tritons that inhibit this ecosystem mostly stay underneath the water. They farm the reefs and fishes and use the intricate underground tunnels as homes. Inside the tunnels bio-luminescent fauna lights up their tunnels. They’re culture consists of people having long expeditions out to sea or along the coast line for exotic fish. They also shepard many sea creatures as they migrate from north to south and vice versa. This is a time for celebration and great harvest. They worship large aquatic creatures such as leviathans and krakens physical aspects of sea gods."
                }
            }, 
            info: "Kalith is the sister southern continent, filled with dwarves, gnomes, and humans. Many of the people that make their homes in cities that scale the mountains of the mountain range of Porsithi, however there are tribes of people scattered throughout the swamp of Ellistauge Bay and some even dwell further down in the land of dinosaurs."
        },
        "Continent 3": {},
        "Continent 4": {},
    } 
}

const WorldPage = () => {
    return (
        <div className='world-page'>
            <div className='world-menu'>
                <WorldMenu worldData={worldData}/>
            </div>
            <div className='world-page-lore'>
                <WorldLore worldData={worldData}/>
            </div>
        </div>
    )
}

export default WorldPage;