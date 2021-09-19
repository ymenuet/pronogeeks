import React from 'react';
import PropTypes from 'prop-types';

const RankingIcon = ({ size, color, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      fill={color}
      width={size}
      height={size}
    >
      <rect fill="none" height="24" width="24" />
      <g>
        <path d="M7.5,21H2V9h5.5V21z M14.75,3h-5.5v18h5.5V3z M22,11h-5.5v10H22V11z" />
      </g>
    </svg>
  );
};

RankingIcon.defaultProps = {
  size: '24px',
  color: '#F0F7F4',
  className: undefined,
};

RankingIcon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default RankingIcon;
