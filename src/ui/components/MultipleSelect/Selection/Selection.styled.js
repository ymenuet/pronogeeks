import styled from "styled-components";
import { getTheme } from "../../../../utils/helpers/theme";

export const Container = styled.div`
  background-color: ${getTheme("lightGrey")};
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.125rem;
  border-radius: 0.375rem;
  cursor: pointer;
  white-space: nowrap;
  padding: 0.125rem 0.25rem 0.125rem 0.375rem;
`;

export const SelectionInfoWrapper = styled.div`
  margin-right: 0.125rem;
  display: flex;
  align-items: center;
`;
