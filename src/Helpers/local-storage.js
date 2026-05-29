export function saveLocalStorage(llave, valor){
    localStorage.setItem(llave, JSON.stringify(valor))
}

export function getLocalStorage(llave) {
    const raw = localStorage.getItem(llave);
    if (raw == null) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function removeLocalStorage(llave){
    localStorage.removeItem(llave)
}