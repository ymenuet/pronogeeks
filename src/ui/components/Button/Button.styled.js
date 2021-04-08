import styled, { css } from 'styled-components'
import colors from '../../theme/colors'

const btnHeight = '3'

const buttonTheme = {
    base: {
        main: colors.base,
        contrast: colors.white,
    },
    error: {
        main: colors.error,
        contrast: colors.white,
    },
    label: {
        main: colors.label,
        constrast: colors.white,
    },
    success: {
        main: colors.success,
        contrast: colors.white,
    },
    warning: {
        main: colors.warning,
        contrast: colors.black,
    }
}

const PrimaryButton = styled.button`
    width: 100%;
    height: ${btnHeight}rem;
    border-radius: ${btnHeight / 2}rem;
    background-color: ${({ kind }) => buttonTheme[kind].main};
    color: ${({ kind }) => buttonTheme[kind].contrast};
    border-color: ${({ kind }) => buttonTheme[kind].main};
    border-style: solid;
    border-width: 0;
    ${({ disabled }) => disabled && css`
        background-color: ${colors.disabled};
    `}
    outline: none!important; /* TODO: remove !important */
`

const SecondaryButton = styled(PrimaryButton)`
    background-color: transparent;
    border-width: 0.063rem;
    color: ${({ kind }) => buttonTheme[kind].main};
`

const buttonFactory = level => {
    const levels = {
        primary: PrimaryButton,
        secondary: SecondaryButton,
    }

    return levels[level]
}

export { buttonFactory, PrimaryButton, SecondaryButton }