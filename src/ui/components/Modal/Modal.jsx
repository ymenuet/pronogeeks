import React from 'react';
import PropTypes from 'prop-types';

import {
  Filter,
  Container,
  Header,
  Border,
  Title,
  CloseIcon,
  Body,
  Message,
  Footer,
  ButtonWrapper,
} from './Modal.styled';

const Modal = ({ isVisible, onClose, title, body, buttons }) => {
  return (
    isVisible && (
      <Filter>
        <Container>
          <Header>
            <Title>{title}</Title>
            <CloseIcon size={24} onClick={onClose} />
          </Header>
          <Border />
          <Body>
            <Message>{body}</Message>
          </Body>
          <Border />
          <Footer>
            {buttons.map((button) => (
              <ButtonWrapper key={button.key}>{button}</ButtonWrapper>
            ))}
          </Footer>
        </Container>
      </Filter>
    )
  );
};

Modal.defaultProps = {
  title: undefined,
  body: undefined,
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  buttons: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Modal;
