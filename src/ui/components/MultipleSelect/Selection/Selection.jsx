import React from "react";
import PropTypes from "prop-types";

import { CloseIcon } from "../../../icons";
import { Container, SelectionInfoWrapper } from "./Selection.styled";

const Selection = ({ children, onClick }) => {
  return (
    <Container onClick={onClick}>
      <SelectionInfoWrapper>{children}</SelectionInfoWrapper>
      <CloseIcon size={16} />
    </Container>
  );
};

Selection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Selection;
