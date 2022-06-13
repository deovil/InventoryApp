import { StyleSheet, View, Text } from "react-native";
import InOutCommon from "../ui/InOutCommon";
import { useContext } from "react";
import { InOutContext } from "../context/InOutContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UniqueContext } from "../context/UniqueContext";
import Colors from "../components/Colors";

export default function OutStock() {
  const inOutContext = useContext(InOutContext);
  const navigation = useNavigation();
  const route = useRoute();
  const uniqueContext = useContext(UniqueContext);

  async function buttonHandler(inputValues) {
    inOutContext.addOutArray(inputValues);
    const newQuantity =
      parseInt(route.params.quantityOfItem) - parseInt(inputValues.quantity);
    const object = {
      name: route.params.nameOfItem,
      quantity: newQuantity.toString(),
      price: route.params.priceOfItem,
    };
    uniqueContext.editInventory(route.params.indexOfItem, object);
    navigation.navigate("OutScreen");
  }

  return (
    <View style={styles.container}>
      <InOutCommon
        OnClick={buttonHandler}
        ProductName={route.params.nameOfItem}
        out={true}
        quant={route.params.quantityOfItem}
      ></InOutCommon>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellowLight,
  },
});
