export function authHeader() {
    const token = localStorage.getItem('token')
    let headers = {};
    if (token) {
        headers = {
            Authorization: `Bearer ${token}`
        }
    }
    return headers
}

