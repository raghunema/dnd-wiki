const API_BASE = 'http://localhost:8000/'
const API_BASE_NPC = 'http://localhost:8000/npcs'
const API_BASE_Events = 'http://localhost:8000/events'
const API_BASE_LOCATION = 'http://localhost:8000/locations'

export const getNPCSchema = async () => {
    const url = API_BASE_NPC + '/schema'

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    });
    if (!apiRes.ok) throw new Error ("Could not fetch npc schema");
    return await apiRes.json();
}

export const getEventSchema = async () => {
    const url = API_BASE_Events + '/schema'

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    });
    if (!apiRes.ok) throw new Error ("Could not fetch event schema");
    return await apiRes.json();
}

export const getLocationSchema = async () => {
    const url = API_BASE_LOCATION+ '/schema'

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    });
    if (!apiRes.ok) throw new Error ("Could not fetch location schema");
    return await apiRes.json();
}

export const getAllNpcs = async () => {
    const url = API_BASE_NPC + '/all'

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    })

    if (!apiRes.ok) throw new Error("Error getting all NPCs");
    return await apiRes.json()


}

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

export const getNpc = async (npcSlug) => {
    const url = API_BASE_NPC + `/single/${npcSlug}`

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    })
     if (!apiRes.ok) throw new Error(`Error getting npc ${npcSlug}`);
    return await apiRes.json()
}

export const getNpcsForEvents = async (npcFilter) => {
    const url = API_BASE_NPC + '/events'

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

export const getEvents = async (filters) => {
    const url = API_BASE_Events + `/filtered`

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

export const getLocationInfo = async (location) => {
    const url = API_BASE + 'locations/single/' + location

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    })

    if (!apiRes.ok) throw new Error(`Error getting location`);
    return await apiRes.json()
}