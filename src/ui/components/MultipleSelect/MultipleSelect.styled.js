import styled from 'styled-components'

import constants from '../../theme/constants'
import { getTheme } from '../../../utils/helpers/theme'

export const SelectionsContainer = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.white};
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 1.2rem;
    overflow: hidden;
    min-height: ${constants.inputHeightInRems}rem;
`

export const Selection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.125rem;
    height: 1.875rem;
    background: ${({ theme }) => theme.grey};
    cursor: pointer;
    white-space: nowrap;
    padding: 0.0.63rem 0.25rem;
`

export const SelectionLabel = styled.span`
    color: ${({ theme }) => theme.black};
`

export const InputWrapper = styled.div`
    padding-left: 0.375rem;
`

export const Input = styled.input`
    flex: 1;
    background-color: ${({ theme }) => theme.white};
    color: ${getTheme('black')};
    border: none;
    outline: none;
    padding: 0 0.375rem;
`

export const OptionsContainer = styled.div`
    max-height: 10rem;
    overflow-y: scroll;
    width: 100%;
`

export const Option = styled.div`
    cursor: pointer;
    height: 1.938rem;
    border-top: 0.063rem solid ${getTheme('grey')};
    background-color: ${getTheme('white')};
    display: flex;
    align-items: center;
    padding: 0.063rem 0.375rem;
`

export const OptionLabel = styled.span`
    color: ${getTheme('black')};
`

// TODO: remove !important
export const Label = styled.label`
    float: left;
    color: ${getTheme('label')}!important;
    padding-left: 0.675rem;
`