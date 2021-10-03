// These helpers are to validate the input if output is true and throw error if false

export const valueRequired = (value) => !!value;

export const arrayNotEmpty = (array) => !!array.length;

export const isEmail = (value) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(value).toLowerCase()
  );
