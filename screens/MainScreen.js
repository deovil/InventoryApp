import { StyleSheet, View, Text, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { UniqueContext } from "../context/UniqueContext";
import { useNavigation } from "@react-navigation/native";
import { fetchInventory } from "../util/datahttp";
import { InOutContext } from "../context/InOutContext";
import Colors from "../components/Colors";
import DisplayPlace from "../ui/DisplayPlace";

export default function MainScreen() {
  const authConxt = useContext(AuthContext);
  const uniqConxt = useContext(UniqueContext);
  const navigation = useNavigation();
  const [empty, setEmpty] = useState(false);
  const inOutConxt = useContext(InOutContext);

  useEffect(() => {
    if (uniqConxt.place.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [uniqConxt.place]);

  async function clickHandler(name, token) {
    uniqConxt.clearInventory();
    inOutConxt.clearInArray();
    inOutConxt.clearOutArray();
    const array = await fetchInventory(uniqConxt.id, token);
    uniqConxt.setInitialInventory(array);
    uniqConxt.setnameOfPressed(name);
    uniqConxt.settokenOfPressed(token);
    navigation.navigate("App2");
  }

  function renderHandler(itemData) {
    return (
      <DisplayPlace
        name={itemData.item.name}
        onClick={clickHandler}
        token={itemData.item.token}
      ></DisplayPlace>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome {"  "}
        {authConxt.username} !
      </Text>
      {empty && <Text style={styles.noplaces}>No Places to Display...</Text>}
      <FlatList
        data={uniqConxt.place}
        renderItem={renderHandler}
        keyExtractor={(item) => {
          return item.token + Math.random.toString();
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
  text: {
    fontSize: 35,
    marginTop: 30,
    marginBottom: 25,
    marginLeft: 20,
    color: Colors.orange,
    fontWeight: "bold",
  },
  noplaces: {
    marginLeft: 20,
    marginTop: 50,
    color: Colors.orange,
    fontWeight: "500",
    fontSize: 20,
  },
});
