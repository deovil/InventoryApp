import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useContext } from "react";
import { UniqueContext } from "../context/UniqueContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateInventory } from "../util/datahttp";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../components/Colors";
import InputData from "../ui/InputData";
import Button from "../ui/Button";

export default function EditStock() {
  const route = useRoute();
  const [inputValues, setInputValues] = useState({
    name: route.params.name,
    price: route.params.price,
    quantity: route.params.quantity,
  });
  const uniqConxt = useContext(UniqueContext);
  const navigation = useNavigation();

  function InputHandlerFunction(identifier, enteredValue) {
    setInputValues((currentState) => {
      return {
        ...currentState,
        [identifier]: enteredValue,
      };
    });
  }
  async function editHandler() {
    uniqConxt.editInventory(route.params.index, inputValues);
    const token = await updateInventory(
      uniqConxt.id,
      uniqConxt.nameOfPressed,
      uniqConxt.tokenOfPressed,
      uniqConxt.inventory
    );
    navigation.navigate("AllStock");
  }
  async function deleteHandler() {
    const id = route.params.index;
    uniqConxt.deleteInventory(id);
    const token = await updateInventory(
      uniqConxt.id,
      uniqConxt.nameOfPressed,
      uniqConxt.tokenOfPressed,
      uniqConxt.inventory
    );
    navigation.navigate("AllStock");
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        style={styles.container}
        extraHeight={250}
        enableOnAndroid={true}
      >
        <View style={styles.container}>
          <View style={styles.innercontainer}>
            <InputData
              label="Name"
              onUpdateValue={InputHandlerFunction.bind(this, "name")}
              value={inputValues.name}
            />
            <InputData
              label="Price"
              onUpdateValue={InputHandlerFunction.bind(this, "price")}
              value={inputValues.price}
              keyboardType="number-pad"
            />
            <InputData
              label="Quantity"
              onUpdateValue={InputHandlerFunction.bind(this, "quantity")}
              value={inputValues.quantity}
              keyboardType="number-pad"
            />
            <Button onPress={editHandler} color={Colors.blue}>
              EDIT
            </Button>
            <Button onPress={deleteHandler} color={Colors.red}>
              DELETE
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellowLight,
  },
  innercontainer: {
    margin: 20,
  },
});
