import { StyleSheet, View, Text } from "react-native";
import InOutCommon from "../ui/InOutCommon";
import { useContext } from "react";
import { InOutContext } from "../context/InOutContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UniqueContext } from "../context/UniqueContext";
import Colors from "../components/Colors";

export default function InStock() {
  const inOutContext = useContext(InOutContext);
  const navigation = useNavigation();
  const route = useRoute();
  const uniqueContext = useContext(UniqueContext);

  function buttonHandler(inputValues) {
    inOutContext.addInArray(inputValues);
    const newQuantity =
      parseInt(route.params.quantityOfItem) + parseInt(inputValues.quantity);
    const object = {
      name: route.params.nameOfItem,
      quantity: newQuantity.toString(),
      price: route.params.priceOfItem,
    };
    uniqueContext.editInventory(route.params.indexOfItem, object);
    navigation.navigate("InScreen");
  }

  return (
    <View style={styles.container}>
      <InOutCommon
        OnClick={buttonHandler}
        ProductName={route.params.nameOfItem}
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
