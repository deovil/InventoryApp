import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  username: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
  setUsername: () => {},
});

function AuthContextProvider({ children }) {
  //This is used to login the user directly if once he has logged in and closes the app and opens the app again

  const [authToken, setAuthToken] = useState(null);
  const [name, setName] = useState(null);

  function authenticate(tokenData) {
    setAuthToken(tokenData);
  }

  function logout() {
    setAuthToken(null);
  }
  function setUsername(username) {
    setName(username);
  }

  const value = {
    token: authToken,
    username: name,
    isAuthenticated: !!authToken, //if authToken is null then its false else its true
    authenticate: authenticate,
    logout: logout,
    setUsername: setUsername,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
