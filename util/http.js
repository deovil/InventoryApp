import axios from "axios";

const API_KEY = "AIzaSyBRcggxZG8T3xps9xNsQtd5u4PhdMAXYCo";

export async function signupUser(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  const userId = response.data.localId;
  return userId;
}

export async function loginUser(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  const userId = response.data.localId;
  return userId;
}
