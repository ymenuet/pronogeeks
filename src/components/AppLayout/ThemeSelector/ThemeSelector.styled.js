import styled from 'styled-components'
import { Switch } from 'antd';

import { SunIcon, MoonIcon } from '../../../ui/icons'

const Selector = styled(Switch)``

const LightModeIcon = styled(SunIcon).attrs(({ theme }) => ({
    color: theme.opposite,
}))``

const DarkModeIcon = styled(MoonIcon).attrs(({ theme }) => ({
    color: theme.opposite,
}))``

export { Selector, LightModeIcon, DarkModeIcon }