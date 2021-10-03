import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { useRandomInputId } from '../../../utils/hooks';
import InputShell from '../InputShell';
import { Container, InputContainer, StyledInput, IconWrapper } from './Input.styled';

const Input = forwardRef(
  (
    {
      label,
      labelColor,
      value,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      validation,
      disabled,
      type,
      name,
      maxLength,
      icon,
      cursor,
    },
    inputRef
  ) => {
    const id = useRandomInputId({ name, placeholder });

    const handleChange = (e) => {
      if (!disabled) onChange(e.target.value, e.target.name, e);
    };

    return (
      <Container>
        <InputShell label={label} labelColor={labelColor} htmlFor={id} validation={validation}>
          <InputContainer>
            <StyledInput
              id={id}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              type={type}
              name={name}
              maxLength={maxLength}
              cursor={cursor}
              autoComplete="on"
              ref={inputRef}
            />
            {icon && <IconWrapper>{icon}</IconWrapper>}
          </InputContainer>
        </InputShell>
      </Container>
    );
  }
);

Input.defaultProps = {
  value: '',
  label: null,
  labelColor: 'label',
  placeholder: '',
  validation: undefined,
  disabled: false,
  type: 'text',
  name: '',
  maxLength: Number.MAX_SAFE_INTEGER,
  icon: null,
  cursor: 'auto',
  onFocus: () => {},
  onBlur: () => {},
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  labelColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  validation: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  icon: PropTypes.node,
  cursor: PropTypes.string,
};

export default Input;
