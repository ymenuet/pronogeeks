import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

import { SelectionsContainer, Selection, SelectionLabel, Input, OptionsContainer, Option, OptionLabel } from './MultipleSelect.styled'

const MultipleSelect = ({ value, name, onChange, options, selectionComponent: SelectionComponent, optionComponent: OptionComponent }) => {

    const getSelectedOptions = useCallback(() => value.map(selectedValue => options.find(option => option.value === selectedValue)), [value, options])

    const inputRef = useRef()

    const [selectedOptions, setSelectedOptions] = useState(getSelectedOptions())

    const [search, setSearch] = useState('')

    const [filteredOptions, setFilteredOptions] = useState([])

    const [showOptions, setShowOptions] = useState(false)

    const [selecting, setSelecting] = useState(false)

    const selectOption = (newSelection) => () => {
        inputRef.current.focus()
        setSelectedOptions([...selectedOptions, newSelection])
    }

    const removeSelection = (valueToRemove) => () => {
        inputRef.current.focus()
        setSelectedOptions(selectedOptions.filter(({ value }) => valueToRemove !== value))
    }

    const onMouseDown = () => {
        setSelecting(true)
    }

    const onFocus = () => setShowOptions(true)

    const onBlur = () => {
        if (selecting) setSelecting(false)
        else setShowOptions(false)
    }

    useEffect(() => {
        if (options.length) setFilteredOptions(options.filter(option =>
            option.label.indexOf(search) > -1 &&
            !selectedOptions.map(({ value }) => value).includes(option.value)
        ))
    }, [options, search, selectedOptions])

    useEffect(() => {
        setSelectedOptions(getSelectedOptions())
    }, [getSelectedOptions])

    useEffect(() => {
        onChange(selectedOptions.map(({ value }) => value))
    }, [selectedOptions, onChange])

    return (
        <>
            <SelectionsContainer>
                {selectedOptions.map(selection =>
                    SelectionComponent ? <SelectionComponent
                        key={selection.value}
                        onClick={removeSelection(selection.value)}
                        {...selection}
                    /> :
                        <Selection key={selection.value} onClick={removeSelection(selection.value)}>
                            <SelectionLabel>
                                {selection.label}
                            </SelectionLabel>
                        </Selection>
                )}
                <Input
                    ref={inputRef}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder='...' // TODO: Use a magnifying glass icon or smthg for the placeholder or fixed icon
                />
            </SelectionsContainer>
            {showOptions && <OptionsContainer>
                {filteredOptions.map(option =>
                    OptionComponent ? <OptionComponent
                        key={option.value}
                        onClick={selectOption(option)}
                        onMouseDown={onMouseDown}
                        {...option}
                    /> :
                        <Option
                            key={option.value}
                            onClick={selectOption(option)}
                            onMouseDown={onMouseDown}
                        >
                            <OptionLabel>
                                {option.label}
                            </OptionLabel>
                        </Option>
                )}
            </OptionsContainer>}
        </>
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
