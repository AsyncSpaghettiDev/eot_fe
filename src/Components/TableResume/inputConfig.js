const updateInputs = [
    {
        "id": "table__id",
        "label": "Número de mesa",
        "input__type": "number",
        "style": {
            "width": "12ch"
        },
        "readOnly": true,
    },
    {
        "id": "table__capacity",
        "label": "Capacidad de la mesa",
        "input__type": "number",
        "style": {
            "width": "12ch"
        },
    }
]

const createActivityInputs = (capacity) => [
    {
        "id": "table__id",
        "label": "Id de la mesa",
        "input__type": "text",
        "readOnly": true,
    },
    {
        "id": "activity__people",
        "label": "Personas a ocupar la mesa",
        "input__type": "number",
        "input__min": 1,
        "input__max": capacity,
    }
]

export const configurationUpdate = (table__id, table__capacity, finallyCallback) => ({
    title: 'Actualizar mesa',
    description: 'Actualizar mesa del restaurant',
    inputs: updateInputs,
    initialState: {
        table__id,
        table__capacity,
    },
    confirmButtonText: 'Actualizar',
    onSubmitAction: async ({ table__id, table__capacity }) => {
        await fetch(`https://eotapp.alwaysdata.net/api/dashboard/tables/${table__id}`, {
            method: 'PUT',
            body: JSON.stringify({
                table__capacity
            }),
            headers: { "Content-Type": "Application/JSON" }
        })
        finallyCallback();
    }
})

export const createActivityConfig = (tableId, tableCapacity, finallyCallback) => ({
    title: 'Crear nueva actividad',
    description: 'Habilitar una mesa ingresando la cantidad de personas que la ocuparán',
    inputs: createActivityInputs(tableCapacity),
    initialState: {
        table__id: tableId,
        activity__people: 1,
    },
    confirmButtonText: 'Crear',
    onSubmitAction: async (dataP) => {
        await fetch(`https://eotapp.alwaysdata.net/api/dashboard/tables/${tableId}`, {
            method: 'POST',
            body: JSON.stringify({
                ...dataP
            }),
            headers: { "Content-Type": "Application/JSON" }
        });
        finallyCallback();
    }
})