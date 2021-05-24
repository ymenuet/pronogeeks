import randomNum from '../randomNum'

export default ({
    name,
    placeholder
}) => `input_${name}_${placeholder}_${randomNum()}`.replaceAll(' ', '')