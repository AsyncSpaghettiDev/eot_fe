import { createEmployee, updateEmployee } from "../../Services";

// Inputs for modal configs
const inputConfigAdd = [
    {
        "id": "employee__name",
        "label": "Nombre del empleado",
        "input__type": "text"
    },
    {
        "id": "employee__lastName",
        "label": "Apellido del empleado",
        "input__type": "text"
    },
    {
        "id": "R_USER_NAME",
        "label": "Nombre de usuario",
        "input__type": "text"
    },
    {
        "id": "USER_PASSWORD",
        "label": "Contraseña del usuario",
        "input__type": "password"
    },
    {
        "id": "USER_ROLE",
        "label": "Rol del empleado",
        "input": true,
        "input__type": "radio",
        "radios__name": "employee-role",
        "radios__buttons": [
            {
                "id": "employee-role-admin",
                "label": "Admin",
                "value": "ADMIN",
            },
            {
                "id": "employee-role-employee",
                "label": "Empleado",
                "value": "EMPLOYEE",
            },
            {
                "id": "employee-role-chef",
                "label": "Chef",
                "value": "CHEF",
            }
        ]
    }
]

// Configs
export const configurationAdd = (finallyAction) => ({
    title: 'Registar nuevo empleado',
    description: null,
    inputs: inputConfigAdd,
    confirmButtonText: 'Añadir',
    onSubmitAction: async (employee) => {
        createEmployee(employee),
            finallyAction()
    }
})

const inputConfigUpdate = (selectedEmployee) => {
    // console.log(selectedEmployee);
    return [
        {
            "id": "employee__id",
            "label": "ID del empleado",
            "input__type": "number",
            "style": {
                "width": "12ch"
            },
            "readOnly": true,
        },
        {
            "id": "employee__name",
            "label": "Nombre del empleado",
            "input__type": "text",
            "defaultValue": selectedEmployee.employee__name
        },
        {
            "id": "employee__lastName",
            "label": "Apellido del empleado",
            "input__type": "text",
            "defaultValue": selectedEmployee.employee__lastName
        },
        {
            "id": "R_USER_NAME",
            "label": "Nombre del empleado",
            "input__type": "text",
            "defaultValue": selectedEmployee.R_USER_NAME
        },
        {
            "id": "USER_PASSWORD",
            "label": "Contraseña del usuario",
            "input__type": "text",
            "defaultValue": selectedEmployee.USER_PASSWORD
        },
        {
            "id": "USER_ROLE",
            "label": "Rol del empleado",
            "input": true,
            "input__type": "radio",
            "radios__name": "employee-role",
            "radios__buttons": [
                {
                    "id": "employee-role-employee",
                    "label": "Empleado",
                    "value": "EMPLOYEE",
                },
                {
                    "id": "employee-role-admin",
                    "label": "Admin",
                    "value": "ADMIN",
                },
                {
                    "id": "employee-role-chef",
                    "label": "Chef",
                    "value": "CHEF",
                }
            ],
            "defaultValue": selectedEmployee.USER_ROLE
        }
    ]
}

export const configurationUpdate = (selectedEmployee, finallyAction) => {
    return {
        title: 'Actualizar empleado',
        description: null,
        inputs: inputConfigUpdate(selectedEmployee),
        confirmButtonText: 'Actualizar',
        onSubmitAction: async (employeeInfo) => {
            await updateEmployee(employeeInfo)
            finallyAction()
        },
        initialState: selectedEmployee,
    }
}