import {
    openNotification
} from '..'

export default (event, setFileName = null) => {
    let data = null
    if (event.target.files.length > 0) {
        const file = event.target.files[0]
        if (file.size > 1000000) openNotification('warning', 'Attention', 'La taille du fichier ne peux pas excéder 1Mo.')
        else if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') openNotification('warning', 'Attention', 'La photo doit être au format JPG ou PNG.')
        else {
            if (setFileName) setFileName(file.name)
            data = new FormData()
            data.append('file', file)
            data.append('upload_preset', 'pronogeeks')
        }
    }
    return data
}