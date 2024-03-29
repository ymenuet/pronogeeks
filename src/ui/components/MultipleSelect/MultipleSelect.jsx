import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useRandomInputId } from "../../../utils/hooks";
import { SearchIcon } from "../../icons";
import InputShell from "../InputShell";
import Selection from "./Selection";
import {
  Container,
  SelectionsContainer,
  SelectionLabel,
  Input,
  OptionsContainer,
  Option,
  OptionLabel,
  InputWrapper,
} from "./MultipleSelect.styled";

const OPTIONS_DISPLAY_LIMIT_NUMBER = 5;

const getMaxIndex = (filteredOptions) =>
  Math.min(filteredOptions.length, OPTIONS_DISPLAY_LIMIT_NUMBER) - 1;

const getOptionIndex = (options, option) =>
  options.findIndex(({ value }) => value === option.value);

const getNextOption = (filteredOptions, preSelectedOption) => {
  const maxIndex = getMaxIndex(filteredOptions);
  const currentIndex = getOptionIndex(filteredOptions, preSelectedOption);
  if (currentIndex < maxIndex && currentIndex > -1)
    return filteredOptions[currentIndex + 1];
  return filteredOptions[0];
};

const getPreviousOption = (filteredOptions, preSelectedOption) => {
  const maxIndex = getMaxIndex(filteredOptions);
  const currentIndex = getOptionIndex(filteredOptions, preSelectedOption);
  if (currentIndex > 0) return filteredOptions[currentIndex - 1];
  return filteredOptions[maxIndex];
};

const MultipleSelect = ({
  value,
  name,
  onChange,
  options,
  validation,
  placeholder,
  label,
  labelColor,
  selectionComponent: SelectionComponent,
  optionComponent: OptionComponent,
  disabled,
}) => {
  const id = useRandomInputId({ name, placeholder });

  const inputRef = useRef();

  const [selectedOptions, setSelectedOptions] = useState([]);

  const [search, setSearch] = useState("");

  const [filteredOptions, setFilteredOptions] = useState([]);

  const [preSelected, setPreSelected] = useState(null);

  const [showOptions, setShowOptions] = useState(false);

  const [selecting, setSelecting] = useState(false);

  const selectOption = (newSelection) => () => {
    inputRef.current.focus();
    setSelectedOptions([...selectedOptions, newSelection]);
  };

  const removeSelection = (valueToRemove) => () => {
    inputRef.current.focus();
    setSelectedOptions(
      selectedOptions.filter(({ value }) => valueToRemove !== value)
    );
  };

  const onMouseDown = () => {
    setSelecting(true);
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setPreSelected(getNextOption(filteredOptions, preSelected));
        return;
      case "ArrowUp":
        e.preventDefault();
        setPreSelected(getPreviousOption(filteredOptions, preSelected));
        return;
      case "Enter":
        e.preventDefault();
        const currentIndex = getOptionIndex(filteredOptions, preSelected);
        selectOption(preSelected)();
        setPreSelected(filteredOptions[currentIndex]);
        return;
      default:
        return;
    }
  };

  const onFocus = () => setShowOptions(true);

  const onBlur = () => {
    if (selecting) setSelecting(false);
    else setShowOptions(false);
  };

  useEffect(() => {
    if (options.length && search)
      setFilteredOptions(
        options.filter(
          (option) =>
            option.label.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
            value &&
            !value.includes(option.value)
        )
      );
    else setFilteredOptions([]);
  }, [options, search, value]);

  useEffect(() => {
    if (!!filteredOptions.length && !preSelected)
      setPreSelected(filteredOptions[0]);
  }, [filteredOptions, preSelected]);

  useEffect(() => {
    !disabled &&
      onChange(
        [...selectedOptions].map(({ value }) => value),
        name
      );
  }, [selectedOptions, onChange, name, disabled]);

  return (
    <Container>
      <InputShell
        label={label}
        labelColor={labelColor}
        htmlFor={id}
        validation={validation}
      >
        <SelectionsContainer disabled={disabled}>
          {selectedOptions.map((selection) =>
            SelectionComponent ? (
              <SelectionComponent
                key={selection.value}
                onRemove={removeSelection(selection.value)}
                {...selection}
              />
            ) : (
              <Selection
                key={selection.value}
                onRemove={removeSelection(selection.value)}
              >
                <SelectionLabel>{selection.label}</SelectionLabel>
              </Selection>
            )
          )}
          <InputWrapper>
            <SearchIcon size={24} />
            <Input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              id={id}
              disabled={disabled}
            />
          </InputWrapper>
        </SelectionsContainer>

        {showOptions && (
          <OptionsContainer>
            {filteredOptions
              .slice(0, OPTIONS_DISPLAY_LIMIT_NUMBER)
              .map((option) => {
                const optionProps = {
                  key: option.value,
                  onClick: selectOption(option),
                  onMouseDown: onMouseDown,
                  onMouseEnter: () => setPreSelected(option),
                  preSelected: option.value === preSelected?.value,
                };
                return OptionComponent ? (
                  <OptionComponent {...optionProps} {...option} />
                ) : (
                  <Option {...optionProps}>
                    <OptionLabel>{option.label}</OptionLabel>
                  </Option>
                );
              })}
          </OptionsContainer>
        )}
      </InputShell>
    </Container>
  );
};

MultipleSelect.defaultProps = {
  options: [],
  label: null,
  labelColor: "label",
  disabled: false,
};

MultipleSelect.propTypes = {
  value: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

export default MultipleSelect;
