import {
    isEmpty
} from "../helpers"

export const handleStateWithId = ({
    id,
    reducerData,
    action,
    setResult,
    setError
}) => {
    const result = reducerData[id]
    if (!result) action(id)
    else if (result.error) setError(result.error)
    else if (!result.loading) setResult(result)
}

export const handleStateWithoutId = ({
    reducerData,
    action,
    setResult,
    setError
}) => {
    const result = reducerData
    if (isEmpty(result)) action()
    else if (result.error) setError(result.error)
    else if (!result.loading) setResult(result)
}