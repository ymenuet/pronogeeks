import React from "react";
import PropTypes from "prop-types";

import { Image } from "./Avatar.styled";

const Avatar = ({ url, remSize, alt }) => (
  <Image src={url} size={remSize} alt={alt} />
);

Avatar.defaultProps = {
  url: "",
  remSize: 3,
  alt: "Avatar",
};

Avatar.propTypes = {
  url: PropTypes.string,
  remSize: PropTypes.number,
  alt: PropTypes.string,
};

export default Avatar;
