export const targetedReset = (statesToReset, resetValue = null) => {
  const resettedStates = {};
  Object.keys(statesToReset).forEach((key) => {
    resettedStates[key] = resetValue;
  });

  return resettedStates;
};

export default ({ statesToReset, resetValue, type, dispatch }) => {
  dispatch({
    type,
    payload: targetedReset(statesToReset, resetValue),
  });
};
