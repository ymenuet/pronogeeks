import React from 'react';
import PropTypes from 'prop-types';

const SecondIcon = ({ size, color, className }) => {
  return (
    <svg
      className={className}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 73.45 122.88"
      style={{ enableBackground: 'new 0 0 73.45 122.88', fillRule: 'evenodd', clipRule: 'evenodd' }}
      xmlSpace="preserve"
    >
      <g>
        <path d="M46.07,50.64c2.2,0.58,4.32,1.36,6.34,2.31L55.59,3h6.58l-5.35,52.42c10.01,6.56,16.63,17.88,16.63,30.74 c0,20.28-16.44,36.72-36.72,36.72C16.44,122.88,0,106.44,0,86.16C0,73.65,6.26,62.6,15.81,55.97L11.27,3h6.58l2.36,50.35 c2.16-1.09,4.43-1.97,6.81-2.61L24.44,0h24.58L46.07,50.64L46.07,50.64z M49.38,101.71H23.87c0.29-2.51,1.18-4.88,2.66-7.1 c1.48-2.22,4.26-4.84,8.33-7.86c2.49-1.85,4.09-3.25,4.79-4.22c0.7-0.96,1.05-1.87,1.05-2.73c0-0.93-0.34-1.73-1.03-2.39 c-0.69-0.66-1.56-0.99-2.61-0.99c-1.08,0-1.97,0.34-2.66,1.03c-0.69,0.69-1.15,1.89-1.39,3.63l-8.5-0.69 c0.33-2.4,0.95-4.27,1.84-5.61c0.89-1.35,2.14-2.37,3.76-3.09c1.62-0.72,3.87-1.08,6.73-1.08c2.99,0,5.31,0.34,6.98,1.03 c1.66,0.68,2.97,1.72,3.92,3.13c0.95,1.42,1.43,3,1.43,4.75c0,1.86-0.55,3.64-1.64,5.34c-1.09,1.69-3.08,3.56-5.96,5.59 c-1.71,1.18-2.86,2.02-3.43,2.49c-0.58,0.48-1.25,1.09-2.04,1.86h13.28V101.71L49.38,101.71z M36.72,58.05 c15.52,0,28.1,12.58,28.1,28.1s-12.58,28.1-28.1,28.1c-15.52,0-28.1-12.58-28.1-28.1S21.2,58.05,36.72,58.05L36.72,58.05z" />
      </g>
    </svg>
  );
};

SecondIcon.defaultProps = {
  size: '24px',
  color: '#616060',
  className: undefined,
};

SecondIcon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default SecondIcon;
