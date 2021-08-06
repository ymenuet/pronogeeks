import styled from 'styled-components';

// TODO: remove !important
export const StyledLabel = styled.label`
  text-align: left;
  padding-left: 0.675rem;
  color: ${({ theme, color }) => theme[color]} !important;
`;
