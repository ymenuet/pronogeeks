import React from 'react';
import PropTypes from 'prop-types';

const RemoveIcon = ({ size, color, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      width={size}
      height={size}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
  );
};

RemoveIcon.defaultProps = {
  size: '30px',
  color: 'white',
  className: undefined,
};

RemoveIcon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default RemoveIcon;
