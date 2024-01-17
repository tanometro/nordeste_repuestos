export let isAuthenticated: boolean = false;


export function setAuthenticated(): void {
    isAuthenticated = true;
}


export function setUnauthenticated(): void {
    isAuthenticated = false;
}