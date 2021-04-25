import styled from 'styled-components'
import { Switch } from 'antd';

import { themeNames } from '../../../ui/theme/themes'
import { SunIcon, MoonIcon } from '../../../ui/icons'

const setOpacity = (theme, matchingTheme, opacity = 0.5) => theme.name === matchingTheme ? 1 : opacity

export const Container = styled.div`
    width: 8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Selector = styled(Switch)``

export const LightModeIcon = styled(SunIcon).attrs(({ theme }) => ({
    color: theme.opposite,
}))`
    opacity: ${({ theme }) => setOpacity(theme, themeNames.lightTheme)}
`

export const DarkModeIcon = styled(MoonIcon).attrs(({ theme }) => ({
    color: theme.opposite,
}))`
    opacity: ${({ theme }) => setOpacity(theme, themeNames.darkTheme)}
`