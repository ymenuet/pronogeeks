export default (e, matchweekInput, matchweekRef, setMatchweekInput) => {
  const clickOutsideInput =
    (e.target.className &&
      typeof e.target.className === 'string' &&
      !e.target.className.includes('cancel-target')) ||
    (e.target.className && !typeof e.target.className === 'string');

  if (clickOutsideInput && matchweekInput !== matchweekRef) setMatchweekInput(matchweekRef);
};
