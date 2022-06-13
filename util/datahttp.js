import axios from "axios";

const BACKEND_URL = "https://inventoryapp-108a4-default-rtdb.firebaseio.com/";

export async function storeData(userId, data) {
  await axios.post(BACKEND_URL + `users/${userId}.json`, data);
}

export async function fetchdata(userId) {
  const response = await axios.get(BACKEND_URL + `users/${userId}.json`);
  const usersData = []; //get all the object in the array

  for (const key in response.data) {
    const userObject = {
      userId: response.data[key].userId,
      username: response.data[key].username,
    };
    usersData.push(userObject);
  }

  return usersData.find((object) => object.userId === userId).username;
}

export async function storePlace(userId, place) {
  const response = await axios.post(
    BACKEND_URL + `places/${userId}.json`,
    place
  );
  return response.data.name;
}
export async function fetchPlace(userId) {
  const response = await axios.get(BACKEND_URL + `places/${userId}.json`);
  let placesData = []; //get all the object in the array
  for (const key in response.data) {
    let object = { token: key, name: response.data[key].placeName };
    placesData.push(object);
  }
  return placesData;
}

export async function updatePlace(id, placeToken, newPlace) {
  await axios.patch(BACKEND_URL + `places/${id}/${placeToken}/.json`, newPlace);
}
export function deletePlace(id, placeToken) {
  return axios.delete(BACKEND_URL + `places/${id}/${placeToken}.json`);
}

export function updateInventory(id, placeName, placeToken, data) {
  return axios.put(
    BACKEND_URL + `places/${id}/${placeToken}/` + `placeInventory.json`,
    data
  );
}

export async function fetchInventory(id, placeName, placeToken) {
  const response = await axios.get(
    BACKEND_URL + `places/${id}/${placeToken}/` + `placeInventory.json`
  );
  const array = []; //get all the object in the array

  for (const key in response.data) {
    const object = {
      name: response.data[key].name,
      price: response.data[key].price,
      quantity: response.data[key].quantity,
    };
    array.push(object);
  }
  return array;
}

export function updateInData(id, placeToken, data) {
  return axios.put(
    BACKEND_URL + `places/${id}/${placeToken}/` + `InData.json`,
    data
  );
}

export async function fetchInData(id, placeToken) {
  const response = await axios.get(
    BACKEND_URL + `places/${id}/${placeToken}/` + `InData.json`
  );
  const array = []; //get all the object in the array

  for (const key in response.data) {
    const object = {
      productName: response.data[key].productName,
      nameOfParty: response.data[key].nameOfParty,
      quantity: response.data[key].quantity,
      gst: response.data[key].gst,
      address: response.data[key].address,
      number: response.data[key].number,
      date: response.data[key].date,
    };
    array.push(object);
  }
  return array;
}

export function updateOutData(id, placeToken, data) {
  return axios.put(
    BACKEND_URL + `places/${id}/${placeToken}/` + `OutData.json`,
    data
  );
}

export async function fetchOutData(id, placeToken) {
  const response = await axios.get(
    BACKEND_URL + `places/${id}/${placeToken}/` + `OutData.json`
  );
  const array = []; //get all the object in the array

  for (const key in response.data) {
    const object = {
      productName: response.data[key].productName,
      nameOfParty: response.data[key].nameOfParty,
      quantity: response.data[key].quantity,
      gst: response.data[key].gst,
      address: response.data[key].address,
      number: response.data[key].number,
      date: response.data[key].date,
    };
    array.push(object);
  }
  return array;
}
