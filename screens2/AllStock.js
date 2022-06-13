import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { UniqueContext } from "../context/UniqueContext";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { updateInventory } from "../util/datahttp";
import { fetchInData } from "../util/datahttp";
import { fetchOutData } from "../util/datahttp";
import { InOutContext } from "../context/InOutContext";
import DisplayInventory from "../ui/DisplayInventory";
import Colors from "../components/Colors";

export default function AllStock() {
  const uniqConxt = useContext(UniqueContext);
  const navigation = useNavigation();
  const inOutContext = useContext(InOutContext);
  const [helperArray, setHelperArray] = useState([]);
  const [initialArray, setInititalArray] = useState([]);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    //this runs when we change the uniqConxt.inventory array and also the rerender of the function takes place
    if (uniqConxt.inventory.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
    async function updateData() {
      const token = await updateInventory(
        uniqConxt.id,
        uniqConxt.nameOfPressed,
        uniqConxt.tokenOfPressed,
        uniqConxt.inventory
      );
    }
    updateData();
    setHelperArray(uniqConxt.inventory);
    setInititalArray(uniqConxt.inventory);
  }, [uniqConxt.inventory]); //we add dependencies to run useEffect only when we have change in the dependencies

  useEffect(() => {
    async function fetchData() {
      const array = await fetchInData(uniqConxt.id, uniqConxt.tokenOfPressed);
      for (const data of array) {
        inOutContext.addInArray(data);
      }
      const array2 = await fetchOutData(uniqConxt.id, uniqConxt.tokenOfPressed);
      for (const data of array2) {
        inOutContext.addOutArray(data);
      }
    }
    fetchData();
  }, []);

  function clickHandler() {
    navigation.navigate("EditStock");
  }
  function renderHandler(itemData) {
    return (
      <DisplayInventory
        name={itemData.item.name}
        onClick={clickHandler}
        price={itemData.item.price}
        quantity={itemData.item.quantity}
        index={itemData.index}
      ></DisplayInventory>
    );
  }

  const searchHandler = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = initialArray.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1; //if we dont get the text then the index returned is -1
      });

      setHelperArray(newData);
    } else {
      setHelperArray(initialArray);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome to the Stock of {"\n"}
          <Text style={styles.placeName}>{uniqConxt.nameOfPressed}</Text>
        </Text>
        <View style={styles.search}>
          <TextInput
            placeholder="Search Here"
            onChangeText={(text) => {
              searchHandler(text);
            }}
            onClear={(text) => searchHandler("")}
          />
        </View>
        {empty && <Text style={styles.nostocks}>No stocks to Display...</Text>}
        {!empty && (
          <Text style={styles.about}>
            Quantity{"          "}|{"           "}Price{"         "}|
            {"          "}Total
          </Text>
        )}
        <FlatList
          data={helperArray}
          renderItem={renderHandler}
          keyExtractor={(item) => {
            return item + Math.random().toString();
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellowLight,
  },
  text: {
    fontSize: 25,
    marginTop: 30,
    marginBottom: 25,
    marginLeft: 20,
    color: Colors.orange,
    fontWeight: "bold",
  },
  search: {
    marginHorizontal: 15,
    backgroundColor: Colors.skin,
    padding: 15,
    borderRadius: 12,
    borderColor: Colors.orangeLight,
    borderWidth: 2,
  },
  placeName: {
    fontSize: 25,
    marginBottom: 25,
    marginLeft: 20,
    color: Colors.red,
    fontWeight: "bold",
  },
  nostocks: {
    marginLeft: 20,
    marginTop: 50,
    color: Colors.orange,
    fontWeight: "500",
    fontSize: 20,
  },
  about: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 20,
    color: Colors.orange,
    fontWeight: "400",
    fontSize: 18,
  },
});
