import {
    useState,
    useEffect
} from 'react'

export const useForm = ({
    initialValues = {},
    onSubmit = () => {},
    resetCondition
}) => {
    const [formData, setFormData] = useState(initialValues)
    const [initialValuesUpdated, setInitialValuesUpdated] = useState(false)

    useEffect(() => {
        if (resetCondition && !initialValuesUpdated) {
            setFormData(initialValues)
            setInitialValuesUpdated(true)
        }
    }, [resetCondition, initialValues, initialValuesUpdated])

    const handleInputChange = (e) => {
        e.persist()
        setFormData(previousData => ({
            ...previousData,
            [e.target.name]: e.target.value
        }))
    }

    const handleValueChange = (key) => (value) => {
        setFormData(previousData => ({
            ...previousData,
            [key]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return {
        formData,
        handleInputChange,
        handleValueChange,
        handleSubmit
    }
}