import styled from "styled-components";
import { rgba } from "polished";

import constants from "../../theme/constants";
import { roundBorder } from "../../../utils/helpers";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const StyledInput = styled.input`
  color: ${({ theme }) => theme.black};
  height: ${constants.inputHeightInRems}rem;
  border-radius: ${roundBorder(constants.inputHeightInRems)};
  padding: 0 ${constants.inputPaddingInRems}rem;
  width: 100%;
  border: 1px solid ${({ theme }) => rgba(theme.opposite, 0.5)};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.disabled};
  }
`;
