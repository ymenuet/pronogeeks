import styled from 'styled-components';

import { EyeIcon, EyeOffIcon } from '../../icons';

const hoverEffect = ({ isHovered, theme }) => ({
  color: isHovered ? theme.opposite : theme.label,
});

export const VisibilityOnIcon = styled(EyeIcon).attrs(hoverEffect)`
  cursor: pointer;
`;

export const VisibilityOffIcon = styled(EyeOffIcon).attrs(hoverEffect)`
  cursor: pointer;
`;
