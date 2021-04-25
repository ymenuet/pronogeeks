import styled from 'styled-components'
import { rgba } from 'polished'
import fonts from '../../ui/theme/fonts'

const maxWidth = '200px'

export const Background = styled.div`
    padding: 20px;

    &::before {
        content: '';
        position: fixed;
        top: var(--navbar-height);
        left: 0;
        width: 100vw;
        height: calc(100vh - var(--navbar-height));
        opacity: 0.8;
        z-index: -1;
        background: url('/images/bg-bp-mirror.jpg') center/contain repeat border-box;
    }
`

export const Container = styled.div`
    background: ${({ theme }) => rgba(theme.background, 0.8)};
    border-radius: 10px;
    padding: 40px;
`
// TODO: remove !important
export const PageTitle = styled.h2`
    color: ${({ theme }) => theme.base}!important;
    font-family: ${fonts.audiowide};
    text-align: left;
`

export const Section = styled.section`
    text-align: left;
`

export const SubTitle = styled.h3`
    color: ${({ theme }) => theme.base};
`
export const Form = styled.form`
    margin-bottom: 1.25rem;
`

export const FormTitle = styled.h4`
    color: ${({ theme }) => theme.cyan};
`

// TODO: remove !important
export const Label = styled.label`
    color: ${({ theme }) => theme.label}!important;
    margin-bottom: 0;
    margin-left: 0.625rem;
`

export const InputContainer = styled.div`
    width: 100%;
    max-width: ${maxWidth};
    margin: 0.625rem 0;
`

export const ButtonWrapper = styled.div`
    width: 100%;
    max-width: ${maxWidth};
`