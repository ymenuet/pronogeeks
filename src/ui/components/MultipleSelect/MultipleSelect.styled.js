import styled from 'styled-components';

import { SearchIcon as Icon } from '../../icons';
import { constants, themeSelector } from '../../theme';

export const Container = styled.div`
  position: relative;
  text-align: left;
`;

export const SelectionsContainer = styled.div`
  width: 100%;
  background-color: ${({ disabled }) =>
    disabled ? themeSelector.midLightGrey : themeSelector.white};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-radius: 0.375rem;
  padding: 0.25rem;
  overflow: hidden;
  min-height: ${constants.inputHeightInRems}rem;
`;

export const SelectionLabel = styled.span`
  color: ${themeSelector.black};
`;

export const InputWrapper = styled.div`
  flex: 1;
  padding-left: 0.125rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Input = styled.input`
  flex: 1;
  background-color: ${({ disabled }) =>
    disabled ? themeSelector.midLightGrey : themeSelector.white};
  color: ${themeSelector.black};
  border: none;
  outline: none;
  padding: 0 0.25rem;
`;

export const OptionsContainer = styled.div`
  width: 100%;
  position: absolute;
`;

export const Option = styled.div`
  cursor: pointer;
  height: 1.938rem;
  border-top: 0.063rem solid ${themeSelector.grey};
  background-color: ${({ preSelected, theme }) => (preSelected ? theme.lightGrey : theme.white)};
  display: flex;
  align-items: center;
  padding: 0.063rem 0.375rem;
`;

export const OptionLabel = styled.span`
  color: ${themeSelector.black};
`;

export const SearchIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.label,
}))``;
