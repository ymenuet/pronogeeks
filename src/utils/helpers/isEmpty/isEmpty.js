export default (myObject) => {
  let result = null;
  if (myObject) result = !Object.keys(myObject).length;
  return result;
};
