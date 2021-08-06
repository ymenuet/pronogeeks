import React from 'react';
import { buttonFactory } from './Button.styled';
import kinds from './theme/kinds';

const Button = ({ label, type, disabled, onClick, level, kind }) => {
  const Button = buttonFactory(level);

  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      kind={disabled ? kinds.disabled : kind}
    >
      {label}
    </Button>
  );
};

// TODO: define propTypes and defaultProps properly
Button.defaultProps = {
  kind: kinds.base,
};

export default Button;
