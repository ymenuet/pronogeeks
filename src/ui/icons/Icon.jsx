import React from 'react';
import PropTypes from 'prop-types';

import { nbToPx } from '../../utils/helpers';

const Icon = ({ size, color, children, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={nbToPx(size)}
      viewBox="0 0 24 24"
      width={nbToPx(size)}
      fill={color}
      {...props}
    >
      {children}
    </svg>
  );
};

Icon.defaultProps = {
  size: 24,
  color: '#fff',
};

Icon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Icon;
