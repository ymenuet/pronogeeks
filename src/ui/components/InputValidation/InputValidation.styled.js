import styled from 'styled-components'

export const Validation = styled.p`
    width: 100%;
    text-align: center;
    margin: 0;
    margin-top: 0.25rem;
    height: 0.875rem;
    line-height: 1rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.error};
`