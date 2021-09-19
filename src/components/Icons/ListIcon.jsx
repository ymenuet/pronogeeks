import React from 'react';
import PropTypes from 'prop-types';

const ListIcon = ({ size, color, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      width={size}
      height={size}
      className={className}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" />
    </svg>
  );
};

ListIcon.defaultProps = {
  size: '24px',
  color: '#F0F7F4',
  className: undefined,
};

ListIcon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default ListIcon;
