import React from 'react'
import { useDispatch } from 'react-redux'

import { useThemePreference } from '../../../utils/hooks'
import { themeNames } from '../../../ui/theme/themes'
import { LightModeIcon, DarkModeIcon, Selector } from './ThemeSelector.styled'

import { changeTheme } from '../../../actions/globalActions'

const checkedTheme = themeNames.darkTheme
const uncheckedTheme = themeNames.lightTheme

const ThemeSelector = () => {
    const dispatch = useDispatch()

    const theme = useThemePreference()

    const handleThemeChange = checked => {
        const theme = checked ? checkedTheme : uncheckedTheme
        dispatch(changeTheme(theme))
    }
    return <>
        <LightModeIcon size={24} />
        <Selector
            type='checkbox'
            checked={theme === checkedTheme}
            onChange={handleThemeChange}
        />
        <DarkModeIcon size={24} />
    </>
}

export default ThemeSelector
