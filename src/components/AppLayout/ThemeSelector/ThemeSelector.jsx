import React from 'react'
import { useDispatch } from 'react-redux'

import { useThemePreference } from '../../../utils/hooks'
import { themeNames } from '../../../ui/theme/themes'
import { LightModeIcon, DarkModeIcon, Selector, Container } from './ThemeSelector.styled'

import { changeTheme } from '../../../actions/globalActions'

const checkedTheme = themeNames.lightTheme
const uncheckedTheme = themeNames.darkTheme

const iconSize = 30;

const ThemeSelector = () => {
    const dispatch = useDispatch()

    const theme = useThemePreference()

    const handleThemeChange = checked => {
        const theme = checked ? checkedTheme : uncheckedTheme
        dispatch(changeTheme(theme))
    }
    return <Container>
        <DarkModeIcon size={iconSize} />
        <Selector
            type='checkbox'
            checked={theme === checkedTheme}
            onChange={handleThemeChange}
        />
        <LightModeIcon size={iconSize} />
    </Container>
}

export default ThemeSelector
