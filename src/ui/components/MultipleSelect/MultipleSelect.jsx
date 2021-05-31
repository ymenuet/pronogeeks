import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import { SelectionsContainer, Selection, SelectionLabel } from './MultipleSelect.styled'

const MultipleSelect = ({ value, name, onChange, options, selectionComponent: SelectionComponent, optionComponent: OptionComponent }) => {

    const getSelectedOptions = useCallback(() => value.map(selectedValue => options.find(option => option.value === selectedValue)), [value, options])

    const [selectedOptions, setSelectedOptions] = useState(getSelectedOptions())

    useEffect(() => {
        setSelectedOptions(getSelectedOptions())
    }, [value.length, getSelectedOptions])

    useEffect(() => {
        onChange(selectedOptions.map(option => option.value))
    }, [selectedOptions, onChange])

    return (
        <SelectionsContainer>
            {selectedOptions.map(option =>
                SelectionComponent ? <SelectionComponent key={option.value} {...option} /> :
                    <Selection key={option.value}>
                        <SelectionLabel>
                            {option.label}
                        </SelectionLabel>
                    </Selection>
            )}
        </SelectionsContainer>
    )
}

MultipleSelect.defaultProps = {
    options: [],
}

MultipleSelect.propTypes = {
    value: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }))
}

export default MultipleSelect
