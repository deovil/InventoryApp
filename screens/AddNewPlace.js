import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import InputPlace from "../ui/InputPlace";
import { useState, useContext } from "react";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { UniqueContext } from "../context/UniqueContext";
import { fetchPlace, storePlace } from "../util/datahttp";
import Colors from "../components/Colors";

export default function AddNewPlace() {
  const [placeName, setPlaceName] = useState("");
  const navigation = useNavigation();
  const uniqConxt = useContext(UniqueContext);

  function placeHandler(name) {
    setPlaceName(name);
  }
  async function buttonHandler() {
    const object = {
      placeName: placeName,
    };
    const token = await storePlace(uniqConxt.id, object);
    const array = await fetchPlace(uniqConxt.id);
    uniqConxt.addPlace(array);
    navigation.navigate("MainScreen");
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <InputPlace
          label="Enter Place Name"
          onUpdateValue={placeHandler.bind(this)}
          value={placeName}
        />
        <Button onPress={buttonHandler} color={Colors.green}>
          DONE
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
