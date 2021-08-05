import React from "react";
import PropTypes from "prop-types";

import { useRandomInputId } from "../../../utils/hooks";
import InputShell from "../InputShell";
import { Container, InputContainer, StyledInput, IconWrapper } from "./Input.styled";

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
  icon,
}) => {
  const id = useRandomInputId({ name, placeholder });

  const handleChange = (e) => {
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
        <InputContainer>
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
          {icon && <IconWrapper>{icon}</IconWrapper>}
        </InputContainer>
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
  icon: null,
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
  icon: PropTypes.node,
};

export default Input;
