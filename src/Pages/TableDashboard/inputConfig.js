// Inputs for modal configs
const createInputs = (lastTableId) => [
    {
        "id": "table__password",
        "label": "Contraseña de la mesa",
        "input__type": "password"
    },
    {
        "id": "table__code",
        "label": "Número de mesa",
        "input__type": "number",
        "style": {
            "width": "12ch"
        },
        "input__min": parseInt(lastTableId) + 1,
    },
    {
        "id": "table__capacity",
        "label": "Capacidad de la mesa",
        "input__type": "number",
        "style": {
            "width": "12ch"
        }
    }
]

export const configurationAdd = (lastTableNo) => ({
    title: 'Registar nueva mesa',
    description: 'Agregar mesa del restaurant',
    inputs: createInputs(lastTableNo),
    initialState: {
        table__code: parseInt(lastTableNo) + 1,
    },
    confirmButtonText: 'Añadir',
    onSubmitAction: async ({ table__code, table__capacity, table__password }) => {
        const response = await fetch('https://eotapp.alwaysdata.net/api/dashboard/table', {
            method: 'POST',
            body: JSON.stringify(
                {
                    R_USER_NAME: `TABLE${table__code}`,
                    USER_PASSWORD: table__password,
                    table__code: `TABLE${table__code}`,
                    table__capacity
                }
            ),
            headers: { "Content-Type": "Application/JSON" }
        });
        const data = await response.json();
        console.log(data);
        fetchTables();
    }
})