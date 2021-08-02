import styled from "styled-components";

import { themeSelector } from "../../ui/theme";

export const OptionContainer = styled.div`
  cursor: pointer;
  border-top: 0.063rem solid ${themeSelector.grey};
  background-color: ${({ preSelected }) =>
    preSelected ? themeSelector.lightGrey : themeSelector.white};
  display: flex;
  align-items: center;
  padding: 0.375rem 0.625rem;
  color: ${themeSelector.black};
`;

export const Username = styled.span`
  margin-left: 0.375rem;
`;
