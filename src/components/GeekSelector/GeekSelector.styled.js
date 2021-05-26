import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`

// TODO: remove !important
export const Label = styled.label`
    padding-left: 0.675rem;
    color: ${({ theme }) => theme.label}!important;
`