import React from "react";
import PropTypes from "prop-types";

import { StyledLabel } from "./Label.styled";

const Label = ({ label, color, htmlFor }) =>
  label ? (
    <StyledLabel color={color} htmlFor={htmlFor}>
      {label}
    </StyledLabel>
  ) : null;

Label.defaultProps = {
  label: undefined,
  color: "label",
};

Label.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
};

export default Label;
