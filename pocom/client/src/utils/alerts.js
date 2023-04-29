import swal from 'sweetalert';

export const swalAlert = (titleAlert, textAlert, iconAlert) => {
    return swal({
        title: titleAlert,
        text: textAlert,
        icon: iconAlert,
    })
}