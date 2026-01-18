import { createContext, useReducer } from "react";

export const InOutContext = createContext({
  inArray: [],
  outArray: [],
  addInArray: () => {},
  addOutArray: () => {},
  clearInArray: () => {},
  clearOutArray: () => {},
  setNewInArray: () => {},
  setNewOutArray: () => {},
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
    case "SETINARRAY":
      const newInarray = action.payload;
      return newInarray;
    case "SETOUTARRAY":
      const newOutarray = action.payload;
      return newOutarray;
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
  function setNewInArray(array) {
    setInArray({ type: "SETINARRAY", payload: array });
  }

  function setNewOutArray(array) {
    setOutArray({ type: "SETOUTARRAY", payload: array });
  }

  const value = {
    inArray: inArray,
    outArray: outArray,
    addInArray: addInArray,
    addOutArray: addOutArray,
    clearInArray: clearInArray,
    clearOutArray: clearOutArray,
    setNewInArray: setNewInArray,
    setNewOutArray: setNewOutArray,
  };

  return (
    <InOutContext.Provider value={value}>{children}</InOutContext.Provider>
  );
}
export default InOutContextProvider;
