// const API_BASE = 'https://dnd-backend-y1zk.onrender.com/'
// const API_BASE_NPC = 'https://dnd-backend-y1zk.onrender.com/npcs'
// const API_BASE_EVENTS = 'https://dnd-backend-y1zk.onrender.com/events'
// const API_BASE_LOCATION = 'https://dnd-backend-y1zk.onrender.com/locations'

const API_BASE = '/api/'
const API_BASE_NPC = '/api/npcs/'
const API_BASE_EVENTS = '/api/events/'
const API_BASE_LOCATION = '/api/locations/'

export const login = async ({username, password}) => {
    const url = API_BASE + 'login'

    console.log(url)

    const apiRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    })

    if (!apiRes.ok) throw new Error(`Error Logging in`);
    return await apiRes
}

/////////////////
// SCHEMA INFO //
/////////////////

export const getNPCSchema = async () => {
    const url = API_BASE_NPC + 'schema'

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    });
    if (!apiRes.ok) throw new Error ("Could not fetch npc schema");
    return await apiRes.json();
}

export const getEventSchema = async () => {
    const url = API_BASE_EVENTS + 'schema'

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    });
    if (!apiRes.ok) throw new Error ("Could not fetch event schema");
    return await apiRes.json();
}

export const getLocationSchema = async () => {
    const url = API_BASE_LOCATION + 'schema'

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    });
    if (!apiRes.ok) throw new Error ("Could not fetch location schema");
    return await apiRes.json();
}

/////////////////
/// NPC GETS ///
///////////////

export const getAllNpcs = async ({ fields, expand }) => {
    let url = new URL(API_BASE_NPC + 'all')

    const params = new URLSearchParams();

    if (fields?.length > 0) {
       params.set('fields', fields.join(','));
    }

    if (expand?.length > 0) {
        params.set('expand', expand.join(','));
    }

    if ([...params].length) {
        url.search = params.toString();
    }

    console.log(url.toString())
    const apiRes = await fetch(url, {
        method: 'GET'
    })

    if (!apiRes.ok) throw new Error("Error getting all NPCs");
    return await apiRes.json()
}

export const getNpc = async ( { fields, expand, _id, reason} ) => {
    let url = new URL(API_BASE_NPC + `single/${_id}`)

    const params = new URLSearchParams();

    if (fields?.length > 0) params.set('fields', fields.join(','));
    if (expand?.length > 0) params.set('expand', expand.join(','));
    if (reason) params.set('reason', reason)

    if ([...params].length) {
        url.search = params.toString();
    }

    console.log(url.toString())
    const apiRes = await fetch(url, {
        method: 'GET'
    })
     
    if (!apiRes.ok) throw new Error(`Error getting npc`);
    return await apiRes.json()
}

export const getAllNpcsForm = async () => {
    const url = API_BASE_NPC + 'form'

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    })

    if (!apiRes.ok) throw new Error("Error getting all NPCs for from");
    return await apiRes.json()

}

export const getNpcsForEvents = async (npcFilter) => {
    const url = API_BASE_NPC + 'events'

    console.log(url)
        const apiRes = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(npcFilter)
    })
    if (!apiRes.ok) throw new Error(`Error getting events`);
    return await apiRes.json()
    
}

///////////////////
/// EVENT GETS ///
/////////////////

export const getEvents = async (filters) => {
    const url = API_BASE_EVENTS + `filtered`

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters)
    })
    if (!apiRes.ok) throw new Error(`Error getting events`);
    return await apiRes.json()
}

export const getAllEvents = async ({ fields, expand }) => {
    const url = new URL(API_BASE_EVENTS + `all`)

    const params = new URLSearchParams();

    if (fields?.length > 0) params.set('fields', fields.join(','));
    if (expand?.length > 0) params.set('expand', expand.join(','));

    if ([...params].length) url.search = params.toString();

    console.log(url.toString())
    const apiRes = await fetch(url, {
        method: 'GET'
    })

    if (!apiRes.ok) throw new Error("Error getting all NPCs");
    return await apiRes.json()

}

export const getEventsForm = async (filters) => {
    const url = API_BASE_EVENTS + `form`

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters)
    })
    if (!apiRes.ok) throw new Error(`Error getting events form`);
    return await apiRes.json()
}

//////////////////////
/// LOCATION GETS ///
////////////////////

export const getLocationInfo = async ({fields, expand, _id}) => {
    const url = new URL(API_BASE + `locations/single/${_id}`)

    const params = new URLSearchParams();

    if (fields?.length > 0) params.set('fields', fields.join(','));
    if (expand?.length > 0) params.set('expand', expand.join(','));

    if ([...params].length) {
        url.search = params.toString();
    }

    //console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    })

    if (!apiRes.ok) throw new Error(`Error getting location`);
    return await apiRes.json()
}

//only for the threeJs Map
export const getLocationMapInfo = async (location) => {
    const url = API_BASE + 'locations/map/' + location

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    })

    if (!apiRes.ok) throw new Error(`Error getting location`);
    return await apiRes.json()
}


export const getLocationsForm = async () => {
    const url = API_BASE_LOCATION + `form`

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
    })
    if (!apiRes.ok) throw new Error(`Error getting location form`);
    return await apiRes.json()
}

//////////////////////////////////////////////////////////////
                  //POST FROM FORM//
//////////////////////////////////////////////////////////////

export const postNPC = async (formInfo, formFunc) => {
    if (formFunc === 'ADD') {
        const url = API_BASE_NPC + ''
        console.log(url)

        const apiRes = await fetch(url, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formInfo)
        })

        if (!apiRes.ok) throw new Error(`Error posting new NPC`);
        return await apiRes.json()
    } else if (formFunc === 'UPDATE') {
        const url = API_BASE_NPC + '/update'
        console.log(url)

        console.log(formFunc)
        const apiRes = await fetch(url, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body:  JSON.stringify(formInfo)
        })

        if (!apiRes.ok) throw new Error(`Error posting updating NPC`);
        return await apiRes.json()

    }

}

export const postEvent = async (formInfo, formFunc) => {
    if (formFunc === 'ADD') {
        const url = API_BASE_EVENTS + 'new'
        console.log(url)

        const apiRes = await fetch(url, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formInfo)
        })

        if (!apiRes.ok) throw new Error(`Error posting new Event`);
        return await apiRes.json()
    } else if (formFunc === 'UPDATE') {
        const url = API_BASE_EVENTS + '/update'
        console.log(url)

        //console.log(formFunc)
        const apiRes = await fetch(url, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body:  JSON.stringify(formInfo)
        })

        if (!apiRes.ok) throw new Error(`Error posting updating Event`);
        return await apiRes.json()

    }
}

export const postLocation = async (formInfo, formFunc) => {
    if (formFunc === 'ADD') {
        const url = new URL(API_BASE_LOCATION + 'new')
        console.log(url)

        const apiRes = await fetch(url, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formInfo)
        })

        if (!apiRes.ok) throw new Error(`Error posting new Event`);
        return await apiRes.json()
    } else if (formFunc === 'UPDATE') {
        const url = new URL(API_BASE_LOCATION + '/update')
        console.log(url)

        const apiRes = await fetch(url, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body:  JSON.stringify(formInfo)
        })

        if (!apiRes.ok) throw new Error(`Error posting updating Event`);
        return await apiRes.json()

    }
}