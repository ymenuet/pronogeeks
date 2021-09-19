import React from 'react';
import PropTypes from 'prop-types';

const GoNextIcon = ({ className, color, size }) => {
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
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  );
};

GoNextIcon.defaultProps = {
  size: '24px',
  color: 'white',
  className: undefined,
};

GoNextIcon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default GoNextIcon;
