import React from 'react';
import PropTypes from 'prop-types';

import { Container, SelectionInfoWrapper, CloseIcon } from './Selection.styled';

const Selection = ({ children, onRemove }) => {
  return (
    <Container onClick={onRemove}>
      <SelectionInfoWrapper>{children}</SelectionInfoWrapper>
      <CloseIcon size={16} />
    </Container>
  );
};

Selection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Selection;
