import React from 'react';
import { Spin, Space } from 'antd';
import PropTypes from 'prop-types';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { LoadingOutlined } from '@ant-design/icons';

import './loader.css';

const Loader = ({ size, tip, color, tipSize, fontSize, container, className, style }) => {
  return (
    <div className={`${container ? 'loader-container' : ''}${className}`} style={style}>
      <Space size={size}>
        <Spin
          size={size}
          tip={tip}
          style={{ color, fontSize: tipSize }}
          indicator={<LoadingOutlined style={{ color, fontSize, marginBottom: 8 }} spin />}
        />
      </Space>
    </div>
  );
};

Loader.defaultProps = {
  size: 'large',
  tip: 'Chargement de la page...',
  color: 'white',
  tipSize: '1.2rem',
  fontSize: '3rem',
  container: true,
  className: '',
  style: undefined,
};

Loader.propTypes = {
  size: PropTypes.string,
  tip: PropTypes.string,
  color: PropTypes.string,
  tipSize: PropTypes.string,
  fontSize: PropTypes.string,
  container: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default Loader;
