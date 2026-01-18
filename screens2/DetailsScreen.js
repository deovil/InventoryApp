import { StyleSheet, View, Text } from "react-native";
import { useEffect, useContext, useState } from "react";
import { UniqueContext } from "../context/UniqueContext";
import Colors from "../components/Colors";

export default function DetailsScreen() {
  const [totalValue, setTotalValue] = useState(0);
  const [size, setSize] = useState(0);
  const uniqConxt = useContext(UniqueContext);

  useEffect(() => {
    let sum = 0;
    for (const element in uniqConxt.inventory) {
      sum +=
        parseInt(uniqConxt.inventory[element].price) *
        parseInt(uniqConxt.inventory[element].quantity);
    }
    setTotalValue(sum);
    setSize(uniqConxt.inventory.length);
  }, [uniqConxt.inventory]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total value of your Inventory</Text>
      <Text style={styles.total}>₹ {totalValue}</Text>
      <Text style={styles.text}>Total Products in your Inventory</Text>
      <Text style={styles.size}>{size}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellowLight,
  },
  text: {
    marginLeft: 20,
    marginTop: 50,
    color: Colors.orange,
    fontWeight: "500",
    fontSize: 25,
  },
  total: {
    marginLeft: 20,
    marginTop: 50,
    color: Colors.red,
    fontWeight: "bold",
    fontSize: 30,
  },
  size: {
    marginLeft: 20,
    marginTop: 20,
    color: Colors.red,
    fontWeight: "bold",
    fontSize: 30,
  },
});
