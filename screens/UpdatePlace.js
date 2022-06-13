import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { updatePlace } from "../util/datahttp";
import { useState } from "react";
import { UniqueContext } from "../context/UniqueContext";
import { useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { fetchPlace } from "../util/datahttp";
import { useNavigation } from "@react-navigation/native";
import { deletePlace } from "../util/datahttp";
import InputPlace from "../ui/InputPlace";
import Button from "../ui/Button";
import Colors from "../components/Colors";

export default function UpdatePlace() {
  const uniqConxt = useContext(UniqueContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [newPlace, setNewPlace] = useState(""); //has new name now we have to update the data
  //update the place first in the database
  //fetch the new place array from the database
  function placeHandler(newName) {
    setNewPlace(newName);
  }
  async function buttonHandler() {
    const object = { placeName: newPlace };
    await updatePlace(uniqConxt.id, route.params.newPlaceToken, object);
    const array = await fetchPlace(uniqConxt.id);
    uniqConxt.addPlace(array);
    navigation.navigate("MainScreen");
  }
  async function deleteHandler() {
    await deletePlace(uniqConxt.id, route.params.newPlaceToken);
    const array = await fetchPlace(uniqConxt.id);
    uniqConxt.addPlace(array);
    navigation.navigate("MainScreen");
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <InputPlace
          label="NewPlace"
          onUpdateValue={placeHandler.bind(this)}
          value={newPlace}
        />
        <Button onPress={buttonHandler} color={Colors.blue}>
          EDIT
        </Button>
        <Button onPress={deleteHandler} color={Colors.red}>
          DELETE
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellowLight,
    padding: 25,
  },
});
