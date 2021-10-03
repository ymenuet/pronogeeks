import styled from 'styled-components';

import { constants } from '../../theme';

export const StyledFileInput = styled.input`
  display: none;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const BrowseButton = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.grey};
  bottom: 0;
  right: 0;
  height: ${constants.inputHeightInRems}rem;
  margin-bottom: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  border-top-right-radius: ${constants.inputHeightInRems}rem;
  border-bottom-right-radius: ${constants.inputHeightInRems}rem;
  cursor: pointer;
`;
