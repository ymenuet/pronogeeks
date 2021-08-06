import { isEmpty } from '..';

export const handleStateWithoutId = ({ reducerData, action, setResult, setError }) => {
  const result = reducerData;
  if (isEmpty(result)) action();
  else if (result.error) setError(result.error);
  else if (!result.loading && !result.empty) setResult(result);
};

export const handleStateWithId = ({ id, reducerData, action, setResult, setError }) => {
  const result = reducerData[id];
  if (!result) action(id);
  else if (result.error) setError(result.error);
  else if (!result.loading) setResult(result);
};

export const handleStateWith2Ids = ({ id1, id2, reducerData, action, setResult, setError }) => {
  const result = reducerData[`${id1}-${id2}`];
  if (!result) action(id1, id2);
  else if (result.error) setError(result.error);
  else if (!result.loading) setResult(result);
};
