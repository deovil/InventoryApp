import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputData from "../ui/InputData";
import Button from "../ui/Button";
import Colors from "../components/Colors";

export default function InOutCommon({ OnClick, ProductName, out, quant }) {
  const [inputValues, setInputValues] = useState({
    productName: ProductName,
    nameOfParty: "",
    quantity: "",
    gst: "",
    address: "",
    number: "",
    date: "",
  });
  function InputHandlerFunction(identifier, enteredValue) {
    setInputValues((currentState) => {
      return {
        ...currentState,
        [identifier]: enteredValue,
      };
    });
  }
  function pressHandler() {
    if (out) {
      if (parseInt(inputValues.quantity) > parseInt(quant)) {
        Alert.alert(
          "Invalid Input",
          "Quantity going out cannot be greater than available quantity"
        );
        setInputValues((currentState) => {
          return {
            ...currentState,
            ["quantity"]: "",
          };
        });
      } else {
        OnClick(inputValues);
      }
    } else OnClick(inputValues);
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        style={styles.container}
        extraHeight={275}
        enableOnAndroid={true}
      >
        <InputData
          label="Name Of Party"
          onUpdateValue={InputHandlerFunction.bind(this, "nameOfParty")}
          value={inputValues.nameOfParty}
        />
        <InputData
          label="Date"
          onUpdateValue={InputHandlerFunction.bind(this, "date")}
          value={inputValues.date}
          placeholder={"YYYY-MM-DD"}
        />
        {}
        <InputData
          label="Quantity"
          onUpdateValue={InputHandlerFunction.bind(this, "quantity")}
          value={inputValues.quantity}
          keyboardType="number-pad"
        />
        <InputData
          label="GST"
          onUpdateValue={InputHandlerFunction.bind(this, "gst")}
          value={inputValues.gst}
        />
        <InputData
          label="Address"
          onUpdateValue={InputHandlerFunction.bind(this, "address")}
          value={inputValues.address}
        />
        <InputData
          label="Mo Number"
          onUpdateValue={InputHandlerFunction.bind(this, "number")}
          value={inputValues.number}
          keyboardType="number-pad"
        />
        <Button onPress={pressHandler} color={Colors.blue}>
          DONE
        </Button>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
