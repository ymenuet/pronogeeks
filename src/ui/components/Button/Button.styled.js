import styled from 'styled-components'
import buttonThemes from './themes'

const btnHeight = '3'

const getTheme = ({ kind, theme }) => buttonThemes[theme.name][kind]

const PrimaryButton = styled.button`
    width: 100%;
    height: ${btnHeight}rem;
    border-radius: ${btnHeight / 2}rem;
    background-color: ${({ kind, theme }) => getTheme({ kind, theme }).main};
    color: ${({ kind, theme }) => getTheme({ kind, theme }).contrast};
    border-color: ${({ kind, theme }) => getTheme({ kind, theme }).main};
    border-style: solid;
    border-width: 0;
    outline: none!important; /* TODO: remove !important */
`

const SecondaryButton = styled(PrimaryButton)`
    background-color: transparent;
    border-width: 0.063rem;
    color: ${({ kind, theme }) => getTheme({ kind, theme }).main};
`

const buttonFactory = level => {
    const levels = {
        primary: PrimaryButton,
        secondary: SecondaryButton,
    }

    return levels[level]
}

export { buttonFactory, PrimaryButton, SecondaryButton }