import {
    useState,
    useEffect,
    useCallback
} from 'react'
import {
    useTranslation
} from 'react-i18next'

export const useForm = ({
    initialValues = {},
    onSubmit = () => {},
    resetCondition,
    validations = {}
}) => {

    const {
        t
    } = useTranslation()

    const createInputsPropsObject = useCallback(() => {
        const inputsProps = {}
        Object.keys(initialValues).map(key => inputsProps[key] = {
            value: initialValues[key],
            name: key
        })
        return inputsProps
    }, [initialValues])

    const [inputsProps, setInputsProps] = useState(createInputsPropsObject())
    const [initialValuesUpdated, setInitialValuesUpdated] = useState(false)

    useEffect(() => {
        if (resetCondition && !initialValuesUpdated) {
            setInputsProps(createInputsPropsObject())
            setInitialValuesUpdated(true)
        }
    }, [resetCondition, initialValuesUpdated, createInputsPropsObject])

    const setInputProp = ({
        inputName,
        prop,
        value
    }) => setInputsProps((previousState) => ({
        ...previousState,
        [inputName]: {
            ...previousState[inputName],
            [prop]: value
        }
    }))

    const setInputValidation = (inputName, value) => setInputProp({
        inputName,
        prop: 'validation',
        value,
    })

    const resetValidation = inputName => setInputValidation(inputName, undefined)

    const setInputValue = (inputName, value) => {
        setInputProp({
            inputName,
            prop: 'value',
            value,
        })
        resetValidation(inputName)
    }

    const handleInputChange = (e) => {
        e.persist()
        setInputValue(e.target.name, e.target.value)
    }

    const handleValueChange = (inputName) => (value) => {
        setInputValue(inputName, value)
    }

    const inputNotValid = inputName => !validations[inputName].validation(inputsProps[inputName].value)

    const checkValidation = () => {
        let error = false
        Object.keys(validations).map(inputName => {
            if (inputNotValid(inputName)) {
                setInputValidation(inputName, validations[inputName].message || t('formValidations.defaultValidationMessage'))
                error = true
            }
            return inputName
        })
        return error
    }

    const getValuesObject = () => {
        const valuesObject = {}
        Object.keys(inputsProps).map(key => valuesObject[key] = inputsProps[key].value)
        return valuesObject
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationError = checkValidation()
        if (validationError) return
        onSubmit(getValuesObject())
    }

    return {
        inputsProps,
        handleInputChange,
        handleValueChange,
        handleSubmit
    }
}