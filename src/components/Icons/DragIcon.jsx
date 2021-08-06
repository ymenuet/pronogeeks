import React from 'react';

const DragIcon = ({ size = '20px', color, className }) => {
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
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g>
          <g>
            <path d="M20,9H4v2h16V9z M4,15h16v-2H4V15z" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default DragIcon;
