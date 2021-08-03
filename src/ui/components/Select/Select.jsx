import React, { useState } from "react";
import PropTypes from "prop-types";

import i18n from "../../../i18n";
import { generateInputId } from "../../../utils/helpers";
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
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleChange = (e) => {
    setIsSelected(true);
    onChange(e.target.value, e.target.name, e);
  };

  const id = generateInputId({ name, placeholder });

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
          disabled={!options}
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
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  validation: PropTypes.string,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  noOptionMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

export default Select;
