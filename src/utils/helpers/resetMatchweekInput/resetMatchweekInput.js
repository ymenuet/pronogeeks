export default (e, matchweekInput, matchweekRef, setMatchweekInput) => {
  const clickOutsideInput = e.target.className
    ? typeof e.target.className === 'string'
      ? !e.target.className.includes('cancel-target')
      : true
    : true;
  if (clickOutsideInput && matchweekInput !== matchweekRef) setMatchweekInput(matchweekRef);
};
