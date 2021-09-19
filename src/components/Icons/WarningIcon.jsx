import React from 'react';
import PropTypes from 'prop-types';

const WarningIcon = ({ size, color, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      width={size}
      height={size}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
    </svg>
  );
};

WarningIcon.defaultProps = {
  size: '24px',
  color: 'rgb(253, 0, 7)',
  className: undefined,
};

WarningIcon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default WarningIcon;
