import React from "react";
import PropTypes from "prop-types";

import { generateInputId } from "../../../utils/helpers";
import InputShell from "../InputShell";
import { Container, StyledInput } from "./Input.styled";

const Input = ({
  label,
  labelColor,
  value,
  onChange,
  placeholder,
  validation,
  disabled,
  type,
  name,
  maxLength,
}) => {
  const handleChange = (e) => {
    !disabled && onChange(e.target.value, e.target.name, e);
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
        <StyledInput
          id={id}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          name={name}
          maxLength={maxLength}
        />
      </InputShell>
    </Container>
  );
};

Input.defaultProps = {
  value: "",
  label: null,
  labelColor: "label",
  placeholder: "",
  validation: undefined,
  disabled: false,
  type: "text",
  name: "",
  maxLength: Number.MAX_SAFE_INTEGER,
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  labelColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  validation: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.number,
};

export default Input;
