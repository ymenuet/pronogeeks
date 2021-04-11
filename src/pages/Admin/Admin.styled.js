import styled from 'styled-components'
import { rgba } from 'polished'
import fonts from '../../ui/theme/fonts'

const Background = styled.div`
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

const Container = styled.div`
    background: ${({ theme }) => rgba(theme.background, 0.8)};
    border-radius: 10px;
    padding: 40px;
`
// TODO: remove !important
const PageTitle = styled.h2`
    color: ${({ theme }) => theme.base}!important;
    font-family: ${fonts.audiowide};
    `

const Section = styled.section`
    text-align: left;
    `

const SubTitle = styled.h3`
    color: ${({ theme }) => theme.base};
    `
const Form = styled.form``

const FormTitle = styled.h4`
    color: ${({ theme }) => theme.cyan};
    `

// TODO: remove !important
const Label = styled.label`
    color: ${({ theme }) => theme.label}!important;
`

const Select = styled.select``

const Option = styled.option``

const Input = styled.input``

export {
    Background,
    Container,
    PageTitle,
    Section,
    SubTitle,
    Form,
    FormTitle,
    Label,
    Select,
    Option,
    Input,
}