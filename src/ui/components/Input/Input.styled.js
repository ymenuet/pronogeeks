import styled from 'styled-components'
import { rgba } from 'polished'

import constants from '../../theme/constants'
import { roundBorder } from '../../../utils/helpers'

export const StyledInput = styled.input`
    color: ${({ theme }) => theme.black};
    height: ${constants.inputHeightInRems}rem;
    border-radius: ${roundBorder(constants.inputHeightInRems)};
    padding: 0 ${constants.inputPaddingInRems}rem;
    width: 100%;
    border: 1px solid ${({ theme }) => rgba(theme.opposite, 0.5)};
    outline: none;

    &::placeholder {
        color: ${({ theme }) => theme.disabled}
    }
`

export const Label = styled.label`
    text-align: left;
`