import { StyleSheet, View, Text, FlatList, TextInput } from "react-native";
import { InOutContext } from "../context/InOutContext";
import { UniqueContext } from "../context/UniqueContext";
import { useContext, useEffect, useState } from "react";
import { updateOutData } from "../util/datahttp";
import Colors from "../components/Colors";

export default function OutScreen() {
  const uniqConxt = useContext(UniqueContext);
  const inOutContext = useContext(InOutContext);
  const [helperArray, setHelperArray] = useState([]);
  const [initialArray, setInititalArray] = useState([]);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (inOutContext.outArray.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
    async function updateData() {
      const token = await updateOutData(
        uniqConxt.id,
        uniqConxt.tokenOfPressed,
        inOutContext.outArray
      );
    }
    updateData();
    setHelperArray(inOutContext.outArray);
    setInititalArray(inOutContext.outArray);
  }, [inOutContext.outArray]);

  function renderHandler(itemData) {
    return (
      <View style={styles.show}>
        <Text style={styles.text}>
          Product Name:- {itemData.item.productName}
        </Text>
        <Text style={styles.text}>
          Party Name:- {itemData.item.nameOfParty}
        </Text>
        <Text style={styles.text}>Quantity:- {itemData.item.quantity}</Text>
        <Text style={styles.text}>GST No:- {itemData.item.gst}</Text>
        <Text style={styles.text}>Address:- {itemData.item.address}</Text>
        <Text style={styles.text}>Number:- {itemData.item.number}</Text>
        <Text style={styles.text}>Date:- {itemData.item.date}</Text>
      </View>
    );
  }
  const searchHandler = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = initialArray.filter(function (item) {
        const itemData = item.productName
          ? item.productName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1; //if we dont get the text then the index returned is -1
      });
      setHelperArray(newData);
    } else {
      setHelperArray(initialArray);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Enter the Product to Search"
          onChangeText={(text) => {
            searchHandler(text);
          }}
          onClear={(text) => searchHandler("")}
        />
      </View>
      {empty && <Text style={styles.nodata}>No Data to Display...</Text>}
      <FlatList
        data={helperArray}
        renderItem={renderHandler}
        keyExtractor={(item) => {
          return item + Math.random().toString();
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellowLight,
  },
  show: {
    margin: 5,
    borderWidth: 2,
    borderColor: Colors.orange,
    borderRadius: 4,
  },
  search: {
    margin: 20,
    backgroundColor: Colors.skin,
    padding: 15,
    borderRadius: 12,
    borderColor: Colors.orangeLight,
    borderWidth: 2,
  },
  nodata: {
    marginLeft: 20,
    marginTop: 30,
    color: Colors.orange,
    fontWeight: "500",
    fontSize: 20,
  },
  text: {
    margin: 5,
  },
});
