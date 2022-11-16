export const releaseTable = async (tableId, lastActivity, updateTables) => {
    const res = await fetch(`https://eotapp.alwaysdata.net/api/dashboard/tables/${tableId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            lastActivity
        }),
        headers: { "Content-Type": "Application/JSON" }
    });

    if (res.status === 406)
        return alert('¡La mesa sigue en uso!')

    const data = await res.json();
    console.log(data);
    updateTables();
}

export const getTables = async () => {
    const res = await fetch('https://eotapp.alwaysdata.net/api/dashboard/tables');
    return res.json();
}