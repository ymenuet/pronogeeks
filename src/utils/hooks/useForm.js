import {
    useState
} from 'react'

export const useForm = ({
    initialValues = {},
    onSubmit = () => {}
}) => {
    const [formData, setFormData] = useState(initialValues)

    const handleInputChange = (e) => {
        e.persist()
        setFormData(previousData => ({
            ...previousData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return {
        formData,
        handleInputChange,
        handleSubmit
    }
}