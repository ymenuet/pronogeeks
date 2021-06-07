import styled from 'styled-components'

import { getTheme } from '../../../utils/helpers/theme'

export const SelectionsContainer = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.white};
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

export const Selection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.125rem;
    height: 1.875rem;
    background: ${({ theme }) => theme.grey};
    cursor: pointer;
    flex: 1;
    white-space: nowrap;
    padding: 0.0.63rem 0.25rem;
`

export const SelectionLabel = styled.span`
    color: ${({ theme }) => theme.black};
`

export const Input = styled.input`
    flex: 1;
    background-color: ${({ theme }) => theme.white};
    color: ${getTheme('black')}
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
`

export const OptionLabel = styled.span`
    color: ${getTheme('black')};
`