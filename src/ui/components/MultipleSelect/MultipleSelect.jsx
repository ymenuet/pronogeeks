import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

import { generateInputId } from '../../../utils/helpers'
import { SearchIcon } from '../../icons'
import InputValidation from '../InputValidation'
import { SelectionsContainer, Selection, SelectionLabel, Input, OptionsContainer, Option, OptionLabel, Label, InputWrapper } from './MultipleSelect.styled'

const MultipleSelect = ({ value, name, onChange, options, validation, placeholder, label, selectionComponent: SelectionComponent, optionComponent: OptionComponent }) => {
    const id = generateInputId({ name, placeholder })

    const handleChange = useCallback(onChange, [])

    const inputRef = useRef()

    const [selectedOptions, setSelectedOptions] = useState([])

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
            option.label.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
            value &&
            !value.includes(option.value)
        ))
    }, [options, search, value])

    useEffect(() => {
        handleChange([...selectedOptions].map(({ value }) => value), name)
    }, [selectedOptions, handleChange, name])

    return (
        <>
            {label && <Label htmlFor={id}>{label}</Label>}

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
                <InputWrapper>
                    <SearchIcon size={24} />
                    <Input
                        ref={inputRef}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        placeholder={placeholder}
                    />
                </InputWrapper>
            </SelectionsContainer>

            {/* TODO: Make OptionsContainer position absolute */}
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

            {validation && <InputValidation validation={validation} />}
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
