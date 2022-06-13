import { createContext, useReducer } from "react";

export const InOutContext = createContext({
  inArray: [],
  outArray: [],
  addInArray: () => {},
  addOutArray: () => {},
  clearInArray: () => {},
  clearOutArray: () => {},
});

function itemsReducer(state, action) {
  switch (action.type) {
    case "ADDINARRAY":
      return [action.payload, ...state];
    case "ADDOUTARRAY":
      return [action.payload, ...state];
    case "CLEARARRAY":
      const array = [];
      return array;
    default:
      return state;
  }
}

function InOutContextProvider({ children }) {
  const [inArray, setInArray] = useReducer(itemsReducer, []);
  const [outArray, setOutArray] = useReducer(itemsReducer, []);
  function addInArray(item) {
    setInArray({ type: "ADDINARRAY", payload: item });
  }
  function addOutArray(item) {
    setOutArray({ type: "ADDOUTARRAY", payload: item });
  }
  function clearInArray() {
    setInArray({ type: "CLEARARRAY" });
  }
  function clearOutArray() {
    setOutArray({ type: "CLEARARRAY" });
  }

  const value = {
    inArray: inArray,
    outArray: outArray,
    addInArray: addInArray,
    addOutArray: addOutArray,
    clearInArray: clearInArray,
    clearOutArray: clearOutArray,
  };

  return (
    <InOutContext.Provider value={value}>{children}</InOutContext.Provider>
  );
}
export default InOutContextProvider;
