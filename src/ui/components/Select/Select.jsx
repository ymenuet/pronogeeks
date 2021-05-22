import React, { useState } from 'react'
import i18n from '../../../i18n'

import { SelectInput, Option } from './Select.styled'

const Select = ({ placeholder, onChange, options }) => {
    const [isSelected, setIsSelected] = useState(false)

    const handleChange = e => {
        setIsSelected(true)
        onChange(e)
    }

    return (
        <SelectInput
            defaultValue={placeholder}
            onChange={handleChange}
            disabled={!options}
            isSelected={isSelected}
        >
            <Option value={placeholder} disabled>{placeholder}</Option>
            {options && options.map(({ value, name }) => <Option key={value} value={value}>{name}</Option>)}
        </SelectInput>
    )
}

Select.defaultProps = {
    placeholder: i18n.t('ui.components.select.defaultPlaceholder')
}

export default Select
