import styled from 'styled-components';

export const Image = styled.img`
  height: ${({ size }) => `${size}rem`};
  width: ${({ size }) => `${size}rem`};
  border-radius: 50%;
  object-fit: cover;
`;
