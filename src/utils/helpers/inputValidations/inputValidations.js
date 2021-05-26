// These helpers are to validate the input if output is true and throw error if false

export const valueRequired = (value) => !!value

export const arrayNotEmpty = (array) => !!array.length