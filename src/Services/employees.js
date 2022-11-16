export const getEmployees = async () => {
    const res = await fetch('https://eotapp.alwaysdata.net/api/employees');
    return res.json();
}

export const createEmployee = async (employeeInfo) => {
    await fetch('https://eotapp.alwaysdata.net/api/employees', {
        method: 'POST',
        body: JSON.stringify({
            ...employeeInfo
        }),
        headers: { 'Content-Type': 'Application/JSON' }
    });
}

export const updateEmployee = async (employeeInfo) => {
    await fetch(`https://eotapp.alwaysdata.net/api/employees/${employeeInfo.employee__id}`, {
        method: 'PUT',
        body: JSON.stringify({
            ...employeeInfo
        }),
        headers: { 'Content-Type': 'Application/JSON' }
    });
}