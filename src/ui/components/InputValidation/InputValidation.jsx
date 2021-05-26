import React from 'react'
import PropTypes from 'prop-types'

import { Validation } from './InputValidation.styled'

const InputValidation = ({ validation }) => {
    return (
        <Validation>
            {`* ${validation}`}
        </Validation>
    )
}

InputValidation.propTypes = {
    validation: PropTypes.string.isRequired,
}

export default InputValidation
