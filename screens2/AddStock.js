import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useContext, useState } from "react";
import { UniqueContext } from "../context/UniqueContext";
import { useNavigation } from "@react-navigation/native";
import Colors from "../components/Colors";
import Button from "../ui/Button";
import InputData from "../ui/InputData";

export default function AddStock() {
  const [inputValues, setInputValues] = useState({
    name: "",
    price: "",
    quantity: "",
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
  function buttonHandler() {
    uniqConxt.addInventory(inputValues);
    navigation.goBack();
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
          <Button onPress={buttonHandler} color={Colors.green}>
            DONE
          </Button>
        </View>
      </View>
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
