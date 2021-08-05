import styled from 'styled-components'

import { EyeIcon, EyeOffIcon } from '../../icons'

const hoverEffect = ({ isHovered, theme }) => ({
    color: isHovered ? theme.opposite : theme.label
})

export const VisibilityOnIcon = styled(EyeIcon).attrs(hoverEffect)``

export const VisibilityOffIcon = styled(EyeOffIcon).attrs(hoverEffect)``