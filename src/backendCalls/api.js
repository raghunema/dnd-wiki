// let API_BASE = 'https://dnd-backend-y1zk.onrender.com/'


let API_BASE = '/api/';
if (process.env.NODE_ENV === 'development') {
  API_BASE = 'http://localhost:8000/';
}

const API_BASE_NPC = `${API_BASE}npcs/`;
const API_BASE_EVENTS = `${API_BASE}events/`;
const API_BASE_LOCATION = `${API_BASE}locations/`;

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

    const apiResMessage = await apiRes.json();
    if (!apiRes.ok) throw new Error(`Error Logging in`);
    return apiResMessage
}

export const requestMagicLink = async ({ email }) => {
    const url = API_BASE + 'login/magic-link'
    console.log(url)

    const apiRes = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({email})
    })

    if (!apiRes.ok) throw new Error("Error getting magic-link")
    return await apiRes.json();
}

export const verifyMagicLink = async ({token}) => {
    const url  = API_BASE + 'login/verify-magic-link'

    const apiRes = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({magicToken: token})
    })

    const apiResMessage = await apiRes.json();
    if (!apiRes.ok) throw new Error(apiResMessage.error)
    
    return await apiResMessage
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
    let url = new URL(API_BASE_NPC + 'all',  window.location.origin)

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
    let url = API_BASE_NPC + `single/${_id}`

    console.log('npc/single/:id')
    const params = new URLSearchParams();

    if (fields?.length > 0) params.set('fields', fields.join(','));
    if (expand?.length > 0) params.set('expand', expand.join(','));
    if (reason) params.set('reason', reason)

    if ([...params].length) {
        url += '?' + params.toString();
    }

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET',
        credentials: 'include'
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

export const getRelations = async () => {
    const url = API_BASE_NPC + 'relationships'

    const apiRes = await fetch(url, {
        method: 'GET'
    })

    if (!apiRes.ok) throw new Error ("Error getting all relationships");
    return await apiRes.json();
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
    const url = new URL(API_BASE_EVENTS + `all`, window.location.origin)

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
    const url = new URL(API_BASE + `locations/single/${_id}`, window.location.origin)

    const params = new URLSearchParams();

    if (fields?.length > 0) params.set('fields', fields.join(','));
    if (expand?.length > 0) params.set('expand', expand.join(','));

    if ([...params].length) {
        url.search = params.toString();
    }

    console.log(url.toString())
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

export const getAllLocations = async ({fields, expand}) => {
    let url = new URL(API_BASE_LOCATION + 'all',  window.location.origin)

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

    if (!apiRes.ok) throw new Error("Error getting all Locations");
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
            //POST FROM FORM - NEW, UPDATE, DEELTE//
//////////////////////////////////////////////////////////////

export const postNPC = async (formInfo, formFunc) => {
    let method = ''
    let url = API_BASE_NPC

    if (formFunc === 'ADD') {
        url += 'new'
        method = 'POST'
    } else if (formFunc === 'UPDATE') {
        url += 'update'
        method = 'POST'
    } else if (formFunc === 'DELETE') {
        url += 'delete'
        method = 'DELETE'
    } else {
        throw new Error('Form Function not recognized')
    }
    console.log(url)

    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found  - please login in again')
    }

    //console.log(formFunc)
    const apiRes = await fetch(url, {
        method: method, 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: process.env.NODE_ENV === 'production' ? 'same-origin' : 'include',
        body:  JSON.stringify(formInfo)
    })

    const apiResMessage = await apiRes.json();
    //console.log(apiResMessage)
    if (!apiRes.ok) throw new Error(apiResMessage.error);
    return apiResMessage;
}

export const postEvent = async (formInfo, formFunc) => {
    let url = API_BASE_EVENTS
    let method = ''

    if (formFunc === 'ADD') {
        url += 'new';
        method = 'POST';
    } else if (formFunc === 'UPDATE') {
        url += 'update';
        method = 'POST';
    } else if (formFunc === 'DELETE') {
        url += 'delete';
        method =  'DELETE'; 
    } else {
        throw new Error('Form Function not recognized')
    }
    console.log(url)

    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found - please login in again')
    }

    const apiRes = await fetch(url, {
        method: method, 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: process.env.NODE_ENV === 'production' ? 'same-origin' : 'include',
        body: JSON.stringify(formInfo)
    })

    const apiResMessage = await apiRes.json();
    if (!apiRes.ok) throw new Error(apiResMessage.error);
    return apiResMessage
}

export const postLocation = async (formInfo, formFunc) => {
    let url = API_BASE_LOCATION
    let method = ''

    if (formFunc === 'ADD') {
        url += 'new';
        method = 'POST';
    } else if (formFunc === 'UPDATE') {
        url += 'update';
        method = 'POST';
    } else if (formFunc === 'DELETE') {
        url += 'delete';
        method =  'DELETE'; 
    } else {
        throw new Error('Form Function not recognized')
    }

    console.log(url)

    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found - please login in again')
    }

    const apiRes = await fetch(url, {
        method: method, 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: process.env.NODE_ENV === 'production' ? 'same-origin' : 'include',
        body: JSON.stringify(formInfo)
    })

    const apiResMessage = await apiRes.json();
    if (!apiRes.ok) throw new Error(apiResMessage.error);
    return apiResMessage
}