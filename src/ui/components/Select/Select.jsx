import React, { useState } from 'react'
import PropTypes from 'prop-types'

import i18n from '../../../i18n'
import { generateInputId } from '../../../utils/helpers'
import { Container, SelectInput, Option, Label } from './Select.styled'

const Select = ({ placeholder, onChange, options, name, label, noOptionMessage }) => {

    const [isSelected, setIsSelected] = useState(false)

    const handleChange = e => {
        setIsSelected(true)
        onChange(e)
    }

    const id = generateInputId({ name, placeholder })

    return <Container>

        {label && <Label htmlFor={id}>{label}</Label>}

        <SelectInput
            id={id}
            name={name}
            defaultValue={placeholder}
            onChange={handleChange}
            disabled={!options}
            isSelected={isSelected}
        >
            <Option value={placeholder} disabled>{placeholder}</Option>
            {!options.length && <Option value={noOptionMessage} disabled>{noOptionMessage}</Option>}

            {options && options.map(({ value, name }) => <Option key={value} value={value}>{name}</Option>)}

        </SelectInput>

    </Container>
}

Select.defaultProps = {
    placeholder: i18n.t('ui.components.select.defaultPlaceholder'),
    noOptionMessage: i18n.t('ui.components.select.noOptions'),
    options: [],
    label: null,
}

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    noOptionMessage: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }))
}

export default Select
