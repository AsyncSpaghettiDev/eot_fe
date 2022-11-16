import { InvalidCredentialsException } from '../Utils/errors';

export const authenticate = async ({ user, password }) => {
    const res = await fetch('/api/auth/', {
        method: 'POST',
        body: JSON.stringify({ user, password }),
        headers: { "Content-Type": "Application/JSON" }
    });

    if (res.status === 404 || res.status === 400)
        throw new InvalidCredentialsException();

    return res.json();
}

export const systemLogout = async () => {
    const res = await fetch('/api/auth/', {
        method: 'DELETE'
    })
    return res.json();
}