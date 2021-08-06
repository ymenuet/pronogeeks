import styled from 'styled-components';
import { rgba } from 'polished';

import { constants, themeSelector } from '../../theme';
import { roundBorder } from '../../../utils/helpers';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${themeSelector.background};
  border-radius: ${roundBorder(constants.inputHeightInRems)};
  border: 1px solid ${({ theme }) => rgba(theme.opposite, 0.5)};
  overflow: hidden;
  padding: 0 ${constants.inputPaddingInRems}rem;
`;

export const StyledInput = styled.input`
  background-color: ${themeSelector.background};
  color: ${({ theme }) => theme.black};
  height: ${constants.inputHeightInRems}rem;
  width: 100%;
  outline: none;
  border: none;

  &::placeholder {
    color: ${({ theme }) => theme.disabled};
  }
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
