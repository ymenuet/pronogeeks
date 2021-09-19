import React from 'react';
import PropTypes from 'prop-types';

const GoBackIcon = ({ className, color, size }) => {
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
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  );
};

GoBackIcon.defaultProps = {
  size: '24px',
  color: 'white',
  className: undefined,
};

GoBackIcon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default GoBackIcon;
