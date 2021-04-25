import React, { useState } from 'react'

import { SelectInput, Option } from './Select.styled'

const Select = ({ defaultValue, onChange, options }) => {
    const [isSelected, setIsSelected] = useState(false)

    const handleChange = e => {
        setIsSelected(true)
        onChange(e)
    }

    return (
        <SelectInput
            defaultValue={defaultValue}
            onChange={handleChange}
            disabled={!options}
            isSelected={isSelected}
        >
            <Option value={defaultValue} disabled>{defaultValue}</Option>
            {options && options.map(({ value, name }) => <Option key={value} value={value}>{name}</Option>)}
        </SelectInput>
    )
}

Select.defaultProps = {
    defaultValue: "Select an option"
}

export default Select
