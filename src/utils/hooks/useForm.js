import {
    useState,
    useEffect
} from 'react'

export const useForm = ({
    initialValues = {},
    onSubmit = () => {},
    resetCondition,
    validations = {}
}) => {
    const [formData, setFormData] = useState(initialValues)
    const [formValidation, setFormValidation] = useState({})
    const [initialValuesUpdated, setInitialValuesUpdated] = useState(false)

    useEffect(() => {
        if (resetCondition && !initialValuesUpdated) {
            setFormData(initialValues)
            setInitialValuesUpdated(true)
        }
    }, [resetCondition, initialValues, initialValuesUpdated])

    const resetValidation = key => setFormValidation((previous) => ({
        ...previous,
        [key]: undefined
    }))

    const handleInputChange = (e) => {
        e.persist()
        const key = e.target.name
        setFormData(previousData => ({
            ...previousData,
            [key]: e.target.value
        }))
        resetValidation(key)
    }

    const handleValueChange = (key) => (value) => {
        setFormData(previousData => ({
            ...previousData,
            [key]: value
        }))
        resetValidation(key)
    }

    const inputNotValid = key => !validations[key].validation(formData[key])

    const checkValidation = () => {
        let error = false
        Object.keys(validations).map(key => {
            if (inputNotValid(key)) {
                setFormValidation((previous) => ({
                    ...previous,
                    [key]: validations[key].message
                }))
                error = true
            } else setFormValidation((previous) => ({
                ...previous,
                [key]: undefined
            }))
            return key
        })
        return error
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationError = checkValidation()
        if (validationError) return
        onSubmit(formData)
    }

    return {
        formData,
        formValidation,
        handleInputChange,
        handleValueChange,
        handleSubmit
    }
}