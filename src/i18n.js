import i18n from 'i18next'
import {
    initReactI18next
} from 'react-i18next'
import fr from './assets/i18n/fr.json'

const resources = {
    fr
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
        escapeValue: false
    }
})

export default i18n