const TOKEN = 'token';
export function setToken(token: string) {
    localStorage.setItem(TOKEN, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN) || '';
}