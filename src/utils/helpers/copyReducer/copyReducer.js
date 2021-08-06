export const copyObject1Layer = (myObject) => ({
  ...myObject,
});

export const copyObject2Layers = (myObject, myProp) => {
  const result = {
    ...myObject,
  };

  if (myObject[myProp]) {
    result[myProp] = {
      ...myObject[myProp],
    };
  } else result[myProp] = {};

  return result;
};

export const copyObject3Layers = (myObject, prop1, prop2) => {
  const result = {
    ...myObject,
  };

  if (myObject[prop1]) {
    result[prop1] = {
      ...myObject[prop1],
    };
    if (myObject[prop1][prop2]) {
      result[prop1][prop2] = {
        ...myObject[prop1][prop2],
      };
    } else {
      result[prop1][prop2] = {};
    }
  } else {
    result[prop1] = {};
    result[prop1][prop2] = {};
  }

  return result;
};

export default (getState, reducer, ...props) => {
  if (!props.length) return getState()[reducer];

  const newObject = getState()[reducer][props[0]];

  switch (props.length) {
    case 2:
      return copyObject2Layers(newObject, props[1]);
    case 3:
      return copyObject3Layers(newObject, props[1], props[2]);
    default:
      return {
        ...newObject,
      };
  }
};
