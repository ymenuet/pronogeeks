import styled from "styled-components";
import { rgba } from "polished";

import constants from "../../theme/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const SelectInput = styled.select`
  height: ${constants.inputHeightInRems}rem;
  border-radius: ${constants.inputHeightInRems / 2}rem;
  border: 1px solid ${({ theme }) => rgba(theme.opposite, 0.5)};
  padding: 0 ${constants.inputPaddingInRems - 0.375}rem;
  line-height: ${constants.inputHeightInRems}rem;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 100%;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.black : theme.disabled};
`;

export const Option = styled.option`
  cursor: pointer;
  color: ${({ disabled, theme }) => (disabled ? theme.disabled : theme.black)};
`;
