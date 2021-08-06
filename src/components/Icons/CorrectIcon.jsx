import React from 'react';

const CorrectIcon = ({ size = '22px', color = '#28a745', className }) => {
  return (
    <svg
      className={className}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 122.88 109.76"
      style={{
        enableBackground: 'new 0 0 122.88 109.76',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        fill: color,
        width: size,
        height: size,
      }}
      xmlSpace="preserve"
    >
      <g>
        <path d="M0,52.88l22.68-0.3c8.76,5.05,16.6,11.59,23.35,19.86C63.49,43.49,83.55,19.77,105.6,0h17.28 C92.05,34.25,66.89,70.92,46.77,109.76C36.01,86.69,20.96,67.27,0,52.88L0,52.88z" />
      </g>
    </svg>
  );
};

export default CorrectIcon;
