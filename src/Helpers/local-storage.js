export function saveLocalStorage(llave, valor){
    localStorage.setItem(llave, JSON.stringify(valor))
}

export function getLocalStorage(llave){
    let usuario = JSON.parse(localStorage.getItem(llave))
    return usuario
}

export function removeLocalStorage(llave){
    localStorage.removeItem(llave)
}