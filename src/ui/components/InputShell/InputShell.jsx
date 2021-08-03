import React from "react";
import PropTypes from "prop-types";

import Label from "../Label";
import InputValidation from "../InputValidation";

const InputShell = ({ children, label, labelColor, htmlFor, validation }) => {
  return (
    <>
      <Label label={label} color={labelColor} htmlFor={htmlFor} />
      {children}
      <InputValidation validation={validation} />
    </>
  );
};

InputShell.defaultProps = {
  children: null,
  label: undefined,
  labelColor: undefined,
  htmlFor: undefined,
  validation: undefined,
};

InputShell.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  htmlFor: PropTypes.string,
  validation: PropTypes.string,
};

export default InputShell;
