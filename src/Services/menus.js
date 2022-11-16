export const getMenuPlates = async () => {
    const res = await fetch('https://eotapp.alwaysdata.net/api/menu/');
    const plates = await res.json();
    return plates.plates;
}

export const getCategories = async () => {
    const res = await fetch('https://eotapp.alwaysdata.net/api/menu/getCategories');
    return res.json();
}

export const updatePlate = async (plateInfo) => {
    const { plate__id } = plateInfo;
    delete plateInfo.plate__id;
    const res = await fetch(`https://eotapp.alwaysdata.net/api/menu/${plate__id}`, {
        method: 'PUT',
        body: JSON.stringify({
            ...plateInfo
        }),
        headers: { "Content-Type": "Application/JSON" }
    });
    return res.json();
}

export const createPlate = async (plateInfo) => {
    const res = await fetch(`https://eotapp.alwaysdata.net/api/menu/`, {
        method: 'POST',
        body: JSON.stringify({
            ...plateInfo
        }),
        headers: { "Content-Type": "Application/JSON" }
    });
    return res.json();
}

export const createCategory = async (categoryInfo) => {
    const res = await fetch(`https://eotapp.alwaysdata.net/api/menu/category`, {
        method: 'POST',
        body: JSON.stringify({
            ...categoryInfo,
        }),
        headers: { "Content-Type": "Application/JSON" }
    });
    return res.json();
}