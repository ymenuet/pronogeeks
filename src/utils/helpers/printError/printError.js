export default (lang, error, errorMessage) =>
  error.response
    ? error.response.data
      ? error.response.data.message
        ? error.response.data.message[lang] || errorMessage
        : errorMessage
      : errorMessage
    : errorMessage;
