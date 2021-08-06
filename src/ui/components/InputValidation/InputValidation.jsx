import React from 'react';
import PropTypes from 'prop-types';

import { Validation } from './InputValidation.styled';

const InputValidation = ({ validation }) =>
  validation ? <Validation>{`* ${validation}`}</Validation> : null;

InputValidation.defaultProps = {
  validation: undefined,
};

InputValidation.propTypes = {
  validation: PropTypes.string,
};

export default InputValidation;
