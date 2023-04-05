import * as jwt from 'react-jwt';

export async function loginUser(email, password) {

    const response = await fetch(`/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    return response.json();

}

export async function registerUser(email, password) {

    const response = await fetch(`/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    return await response.json();

}

export function TokenIsValid(token) {
    if (jwt.isExpired(token)) {
        return false
    }
    return true
}