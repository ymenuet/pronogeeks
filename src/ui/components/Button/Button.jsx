import React from 'react';
import PropTypes from 'prop-types';

import { buttonFactory } from './Button.styled';
import kinds from './theme/kinds';
import levels from './theme/levels';

const Button = ({ label, type, disabled, onClick, level, kind }) => {
  const Btn = buttonFactory(level);

  return (
    <Btn type={type} disabled={disabled} onClick={onClick} kind={disabled ? kinds.disabled : kind}>
      {label}
    </Btn>
  );
};

Button.defaultProps = {
  kind: kinds.base,
  level: levels.primary,
  disabled: false,
  type: 'button',
};

Button.propTypes = {
  kind: PropTypes.oneOf(Object.values(kinds)),
  level: PropTypes.oneOf(Object.values(levels)),
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Button;
