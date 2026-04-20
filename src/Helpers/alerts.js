import Swal from "sweetalert2";

export function redirect(message, url, icono) {
    let timerInterval;
    Swal.fire({
        title: message,
        html: "Cerrando en <b></b> milisegundos.",
        icon: icono,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
            window.location.href = url;
        }
    });
}
