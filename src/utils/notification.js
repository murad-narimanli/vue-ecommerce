import iziToast from 'izitoast'// https://github.com/dolce/iziToast
import VueNotifications from 'vue-notifications'

function toast({title, message, type, timeout, cb}) {
    if (type === VueNotifications.types.warn) type = 'warning'
    return iziToast[type]({title, message, timeout})
}

export const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
}

export const notifications = {
    showSuccessMsg: {
        type: VueNotifications.types.success,
        title: 'Hello there',
        message: 'Successfully done !'
    },
    showErrorMsg: {
        type: VueNotifications.types.error,
        title: 'Wow-wow',
        message: 'Something went wrong'
    }
}


