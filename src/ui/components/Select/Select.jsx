import React, { useState } from "react";
import PropTypes from "prop-types";

import i18n from "../../../i18n";
import { useRandomInputId } from "../../../utils/hooks";
import InputShell from "../InputShell";
import { Container, SelectInput, Option } from "./Select.styled";

const Select = ({
  placeholder,
  onChange,
  options,
  validation,
  name,
  label,
  labelColor,
  noOptionMessage,
  disabled,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const id = useRandomInputId({ name, placeholder });

  const handleChange = (e) => {
    setIsSelected(true);
    !disabled && onChange(e.target.value, e.target.name, e);
  };

  return (
    <Container>
      <InputShell
        label={label}
        labelColor={labelColor}
        htmlFor={id}
        validation={validation}
      >
        <SelectInput
          id={id}
          name={name}
          defaultValue={placeholder}
          onChange={handleChange}
          disabled={!options || disabled}
          isSelected={isSelected}
        >
          <Option value={placeholder} disabled>
            {placeholder}
          </Option>
          {!options.length && (
            <Option value={noOptionMessage} disabled>
              {noOptionMessage}
            </Option>
          )}

          {options &&
            options.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
        </SelectInput>
      </InputShell>
    </Container>
  );
};

Select.defaultProps = {
  placeholder: i18n.t("ui.components.select.defaultPlaceholder"),
  noOptionMessage: i18n.t("ui.components.select.noOptions"),
  validation: undefined,
  options: [],
  label: null,
  labelColor: "label",
  disabled: false,
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  validation: PropTypes.string,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  noOptionMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

export default Select;
