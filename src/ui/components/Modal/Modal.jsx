import React from 'react'
import { Filter, Container, Header, CloseIcon } from './Modal.styled'

const Modal = ({ isVisible, onClose, title }) => {
    return isVisible && (
        <Filter>
            <Container>
                <Header>
                    <CloseIcon size={24} onClick={onClose} />
                </Header>
            </Container>
        </Filter>
    )
}

export default Modal
