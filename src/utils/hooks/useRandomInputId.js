import { useMemo } from "react";

import randomNum from "../helpers/randomNum";

export const useRandomInputId = ({ name, placeholder }) => {
  const print = (string) => (string ? string : "");
  return useMemo(
    () =>
      `input_${print(name)}_${print(placeholder)}_${randomNum()}`.replaceAll(
        " ",
        ""
      ),
    [name, placeholder]
  );
};
