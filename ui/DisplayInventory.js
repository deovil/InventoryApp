import { StyleSheet, View, Pressable, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../components/Colors";

export default function DisplayInventory({ name, price, quantity, index }) {
  const navigation = useNavigation();
  const totalValue = parseInt(price) * parseInt(quantity);

  function InventoryData() {
    return (
      <View style={styles.data}>
        <Text style={styles.dataQuantity}>{quantity}</Text>
        <Text style={styles.dataPrice}>₹ {price}</Text>
        <Text style={styles.dataTotal}>₹ {totalValue}</Text>
      </View>
    );
  }
  function EditPlace() {
    function editHandler() {
      navigation.navigate("EditStock", {
        name: name,
        price: price,
        quantity: quantity,
        index: index,
      });
    }

    return (
      <View style={styles.editButton}>
        <Button
          onPress={editHandler}
          title="EDIT"
          color={Colors.orange}
        ></Button>
      </View>
    );
  }

  function InHandler() {
    function a() {
      navigation.navigate("InStock", {
        nameOfItem: name,
        indexOfItem: index,
        quantityOfItem: quantity,
        priceOfItem: price,
      });
    }
    return (
      <View style={styles.inButton}>
        <Button onPress={a} title="IN" color={Colors.greenDark}></Button>
      </View>
    );
  }

  function OutHandler() {
    function b() {
      navigation.navigate("OutStock", {
        nameOfItem: name,
        indexOfItem: index,
        quantityOfItem: quantity,
        priceOfItem: price,
      });
    }
    return (
      <View style={styles.outButton}>
        <Button onPress={b} title="OUT" color={Colors.red}></Button>
      </View>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: Colors.orangeLight },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.innercontainer}>
        <Text style={styles.text}>{name}</Text>
        {InventoryData()}
        <View style={styles.buttons}>
          {EditPlace()}
          {InHandler()}
          {OutHandler()}
        </View>
      </View>
    </Pressable>
  );
  vv;
}
const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 15,
    borderColor: Colors.orange,
    borderWidth: 2,
    borderRadius: 8,
  },
  innercontainer: {
    flex: 1,
  },
  editButton: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: Colors.yellowLight,
    borderWidth: 2,
    borderColor: Colors.orange,
    borderRadius: 8,
    padding: 2,
  },
  inButton: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: Colors.yellowLight,
    borderWidth: 2,
    borderColor: Colors.greenDark,
    borderRadius: 8,
    padding: 2,
  },
  outButton: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: Colors.yellowLight,
    borderWidth: 2,
    borderColor: Colors.red,
    borderRadius: 8,
    padding: 2,
  },
  text: {
    color: Colors.red,
    fontSize: 20,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.75,
  },
  data: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dataPrice: {
    color: Colors.greenDark,
    fontSize: 18,
    fontWeight: "500",
  },
  dataQuantity: {
    color: Colors.orange,
    fontSize: 18,
    fontWeight: "700",
  },
  dataTotal: {
    color: Colors.greenDark,
    fontSize: 20,
    fontWeight: "700",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
