import styled from 'styled-components'
import { rgba } from 'polished'

import constants from '../../theme/constants'
import { roundBorder } from '../../../utils/helpers'

export const StyledInput = styled.input`
    height: ${constants.inputHeightInRems}rem;
    border-radius: ${roundBorder(constants.inputHeightInRems)};
    padding: 0 ${constants.inputPaddingInRems}rem;
    width: 100%;
    border: 1px solid ${({ theme }) => rgba(theme.opposite, 0.5)};

    &::placeholder {
        color: ${({ theme }) => theme.disabled}
    }
`