import styled from 'styled-components'
import { rgba } from 'polished'
import { CloseIcon as Close } from '../../icons'
import constants from '../../theme/constants'
import colors from '../../theme/colors'

const modalPadding = '1.875rem'

const Filter = styled.div`
    position: fixed;
    top: ${constants.navbarHeight};
    left: 0;
    width: 100vw;
    height: calc(100vh - ${constants.navbarHeight});
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${rgba(colors.disabled, 0.7)}; /* TODO: update color */
    backdrop-filter: blur(2px);
    z-index: 2;
`

const Container = styled.div`
    background-color: ${colors.white};
    border-radius: ${constants.borderRadius};;
    position: relative;
    max-width: 30rem;
`

const Header = styled.div`
    padding: ${modalPadding} ${modalPadding} 0 ${modalPadding};
`

const Border = styled.hr`
    margin: 1.25rem 0 1.25rem 0;
`

const CloseIcon = styled(Close)`
    cursor: pointer;
    position: absolute;
    top: 0.313rem;
    right: 0.313rem;
`

const Title = styled.h3``

const Body = styled.div`
    text-align: left;
    padding: 0 ${modalPadding} 0 ${modalPadding};
`

const Message = styled.p``

const Footer = styled.div`
    padding: 0 ${modalPadding} ${modalPadding} ${modalPadding};
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const ButtonWrapper = styled.div`
    flex: 1;
    margin: 0 5%;
`

export { Filter, Container, Header, Border, CloseIcon, Title, Body, Message, Footer, ButtonWrapper }