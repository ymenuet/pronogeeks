import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import i18n from '../../../i18n'
import { Container, SelectInput, Option, Label } from './Select.styled'

const Select = ({ placeholder, onChange, options, name, label }) => {
    const { t } = useTranslation()

    const [isSelected, setIsSelected] = useState(false)

    const handleChange = e => {
        setIsSelected(true)
        onChange(e)
    }

    const noOptions = t('ui.components.select.noOptions')

    return <Container>

        {label && <Label>{label}</Label>}

        <SelectInput
            name={name}
            defaultValue={placeholder}
            onChange={handleChange}
            disabled={!options}
            isSelected={isSelected}
        >
            <Option value={placeholder} disabled>{placeholder}</Option>
            {!options.length && <Option value={noOptions} disabled>{noOptions}</Option>}
            {options && options.map(({ value, name }) => <Option key={value} value={value}>{name}</Option>)}
        </SelectInput>

    </Container>
}

Select.defaultProps = {
    placeholder: i18n.t('ui.components.select.defaultPlaceholder'),
    options: [],
    label: null,
}

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }))
}

export default Select
