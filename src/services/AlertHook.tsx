import Swal from 'sweetalert2'

export const useAlert = () => {
    // add callback to alert
    const alert = (title: string, message: string, icon: any, confirmButtonText: string,
        callback?: () => void) => {
        Swal.fire({
            title,
            text: message,
            icon,
            confirmButtonText,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                if (callback) {
                    callback()
                }
            }
        })
    }
    return alert
}