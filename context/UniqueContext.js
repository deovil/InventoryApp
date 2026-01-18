import { createContext, useState, useReducer } from "react";

export const UniqueContext = createContext({
  id: "",
  username: "",
  nameOfPressed: "",
  tokenOfPressed: "",
  place: [],
  inventory: [],
  addPlace: () => {},
  addInventory: () => {},
  setnameOfPressed: () => {},
  settokenOfPressed: () => {},
  setUsername: () => {},
  editInventory: () => {},
  setUserId: () => {},
  clearInventory: () => {},
  deleteInventory: () => {},
  setInitialInventory: () => {},
});
function itemsReducer(state, action) {
  //reducer can be used to manage many function at same time
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "CLEAR":
      const array = [];
      return array;
    case "UPDATE":
      const Element = state[action.payload.id];
      const updatedElement = { ...Element, ...action.payload.data }; //process of replacement
      const updatedList = [...state]; //transfer the old list in the new const
      updatedList[action.payload.id] = updatedElement; //now update the new const
      return updatedList;
    case "DELETE":
      const copy = [...state];
      copy.splice(action.payload, 1);
      return copy;
    case "SET":
      const initial = action.payload;
      return initial;
    default:
      return state;
  }
}
function UniqueContextProvider({ children }) {
  const [inventory, setInventory] = useReducer(itemsReducer, []);
  function addInventory(inventoryData) {
    setInventory({ type: "ADD", payload: inventoryData });
  }
  function clearInventory() {
    setInventory({ type: "CLEAR" });
  }
  function editInventory(id, inventoryData) {
    setInventory({ type: "UPDATE", payload: { id: id, data: inventoryData } });
  }
  function deleteInventory(id) {
    setInventory({ type: "DELETE", payload: id });
  }
  function setInitialInventory(array) {
    setInventory({ type: "SET", payload: array });
  }

  const [id, setId] = useState("");
  const [name, setName] = useState(null);
  const [place, setPlace] = useState([]);
  const [nameOfPressed, addnameOfPressed] = useState("");
  const [tokenOfPressed, addtokenOfPressed] = useState("");
  function setUserId(id) {
    setId(id);
  }
  function setUsername(username) {
    setName(username);
  }
  function addPlace(places) {
    setPlace(places);
  }
  function setnameOfPressed(username) {
    addnameOfPressed(username);
  }
  function settokenOfPressed(token) {
    addtokenOfPressed(token);
  }

  const value = {
    id: id,
    username: name,
    tokenOfPressed: tokenOfPressed,
    nameOfPressed: nameOfPressed,
    place: place,
    inventory: inventory,
    addPlace: addPlace,
    addInventory: addInventory,
    setUsername: setUsername,
    settokenOfPressed: settokenOfPressed,
    setnameOfPressed: setnameOfPressed,
    setUserId: setUserId,
    clearInventory: clearInventory,
    editInventory: editInventory,
    deleteInventory: deleteInventory,
    setInitialInventory: setInitialInventory,
  };

  return (
    <UniqueContext.Provider value={value}>{children}</UniqueContext.Provider>
  );
}
export default UniqueContextProvider;
