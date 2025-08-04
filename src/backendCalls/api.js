const API_BASE = 'http://localhost:8000/'
const API_BASE_NPC = 'http://localhost:8000/npcs'

export const getNPCSchema = async () => {
    const url = API_BASE_NPC + '/schema'

    console.log(url)
    const apiRes = await fetch(url, {
        method: 'GET'
    });
    if (!apiRes.ok) throw new Error ("Could not fetch npc schema");
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