import styled from 'styled-components'
import { rgba } from 'polished'
import { CloseIcon as Close } from '../../icons'
import constants from '../../theme/constants'
import colors from '../../theme/colors'

const Filter = styled.div`
    position: fixed;
    top: ${constants.navbarHeight};
    left: 0;
    width: 100vw;
    height: calc(100vh - ${constants.navbarHeight});
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${rgba(colors.grey, 0.5)}; /* TODO: update color */
    backdrop-filter: blur(2px);
    z-index: 2;
`

const Container = styled.div`
    background-color: ${colors.white};
    padding: 1.875rem;
    border-radius: ${constants.borderRadius};;
    position: relative;
`

const Header = styled.div``

const CloseIcon = styled(Close)`
    cursor: pointer;
    position: absolute;
`

export { Filter, Container, Header, CloseIcon }