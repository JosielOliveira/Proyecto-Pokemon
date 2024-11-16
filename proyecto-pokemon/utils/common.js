/**
 * Guarda datos en sessionStorage
 * @param {string} key - Clave para almacenar el dato
 * @param {string} value - Valor a almacenar
 */
export function setSessionData(key, value) {
    sessionStorage.setItem(key, value);
}

/**
 * Verifica si el usuario está logueado
 * @returns {boolean}
 */
export function checkLoginStatus() {
    return localStorage.getItem('loggedIn') === 'true';
}

/**
 * Redirige al dashboard/página principal
 */
export function redirectToDashboard() {
    window.location.href = 'index.html';
}

/**
 * Cierra la sesión del usuario
 */
export function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    sessionStorage.clear();
    window.location.href = 'login.html';
}