import styled from 'styled-components'
import { rgba } from 'polished'
import colors from '../../ui/theme/colors'
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
    background: ${rgba(colors.white, 0.8)};
    border-radius: 10px;
    padding: 40px;
`
// TODO: remove !important
const PageTitle = styled.h2`
    color: ${colors.marineBlue}!important;
    font-family: ${fonts.audiowide};
    `

const Section = styled.section`
    text-align: left;
    `

const SubTitle = styled.h3`
    color: ${colors.marineBlue};
    `
const Form = styled.form``

const FormTitle = styled.h4`
    color: ${colors.cyan};
    `

// TODO: remove !important
const Label = styled.label`
    color: ${colors.grey}!important;
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