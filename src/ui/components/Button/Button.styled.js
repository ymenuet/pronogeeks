import styled, { css } from 'styled-components';
import buttonThemes from './theme/themes';

const btnHeight = '3';

const getTheme = ({ kind, theme }) => buttonThemes[theme.name][kind];

const PrimaryButton = styled.button`
  width: 100%;
  height: ${btnHeight}rem;
  border-radius: ${btnHeight / 2}rem;
  background-color: ${(props) => getTheme(props).main};
  color: ${(props) => getTheme(props).contrast};
  border-color: ${(props) => getTheme(props).main};
  border-style: solid;
  border-width: 0;
  outline: none !important; /* TODO: remove !important */

  &:hover {
    transform: ${({ disabled }) =>
      !disabled &&
      css`
            scale(1.02);
        `};
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  border-width: 0.063rem;
  color: ${(props) => getTheme(props).main};
`;

const buttonFactory = (level) => {
  const levels = {
    primary: PrimaryButton,
    secondary: SecondaryButton,
  };

  return levels[level];
};

export { buttonFactory, PrimaryButton, SecondaryButton };
