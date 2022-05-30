export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userdata'));
}

export function setUserData(data) {
    sessionStorage.setItem('userdata', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('userdata');
}