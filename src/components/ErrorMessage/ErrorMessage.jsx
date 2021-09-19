import React from 'react';
import PropTypes from 'prop-types';

import { WarningIcon } from '../Icons';
import './errorMessage.css';

const ErrorMessage = ({ children, ...rest }) => {
  return (
    <p className="error-message-component" {...rest}>
      <WarningIcon />
      &nbsp;{children}
    </p>
  );
};

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
