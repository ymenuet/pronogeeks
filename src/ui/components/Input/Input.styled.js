import styled from 'styled-components';
import { rgba } from 'polished';

import { constants, themeSelector } from '../../theme';

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
  border-radius: ${constants.inputHeightInRems}rem;
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
  border: none !important;

  &::placeholder {
    color: ${({ theme }) => theme.disabled};
  }

  &:-webkit-autofill {
    box-shadow: 0 0 1000px 0 ${themeSelector.background} inset;
    -webkit-box-shadow: 0 0 1000px 0 ${themeSelector.background} inset;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
