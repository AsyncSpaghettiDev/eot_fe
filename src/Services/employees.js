export const getEmployees = async () => {
    const res = await fetch('/api/employees');
    return res.json();
}

export const createEmployee = async (employeeInfo) => {
    await fetch('/api/employees', {
        method: 'POST',
        body: JSON.stringify({
            ...employeeInfo
        }),
        headers: { 'Content-Type': 'Application/JSON' }
    });
}

export const updateEmployee = async (employeeInfo) => {
    await fetch(`/api/employees/${employeeInfo.employee__id}`, {
        method: 'PUT',
        body: JSON.stringify({
            ...employeeInfo
        }),
        headers: { 'Content-Type': 'Application/JSON' }
    });
}