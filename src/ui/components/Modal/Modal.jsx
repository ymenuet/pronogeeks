import React from 'react'
import { Filter, Container, Header, Border, Title, CloseIcon, Body, Message, Footer, ButtonWrapper } from './Modal.styled'

const Modal = ({ isVisible, onClose, title, body, buttons }) => {
    return isVisible && (
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
                    {buttons.map(button => <ButtonWrapper key={button.key}>
                        {button}
                    </ButtonWrapper>)}
                </Footer>
            </Container>
        </Filter>
    )
}

export default Modal
