import { StyleSheet, View, Button, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { UniqueContext } from "../context/UniqueContext";
import { useNavigation } from "@react-navigation/native";
import { InOutContext } from "../context/InOutContext";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../components/Colors";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default function MoreScreen() {
  const authConxt = useContext(AuthContext);
  const uniqConxt = useContext(UniqueContext);
  const navigation = useNavigation();
  const inOutConxt = useContext(InOutContext);

  function logoutHandler() {
    uniqConxt.clearInventory();
    inOutConxt.clearInArray();
    inOutConxt.clearOutArray();
    authConxt.logout();
  }

  function backHandler() {
    uniqConxt.clearInventory();
    inOutConxt.clearInArray();
    inOutConxt.clearOutArray();
    navigation.navigate("MainScreen");
  }
  return (
    <View style={styles.container}>
      <Pressable
        onPress={logoutHandler}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <View style={styles.innercontainer}>
          <Ionicons
            name="log-out-outline"
            size={40}
            color={Colors.yellowLight}
          />
          <Text style={styles.text}>Log Out</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={backHandler}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <View style={styles.innercontainer}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={40}
            color={Colors.yellowLight}
          />
          <Text style={styles.text}>Back to MainScreen</Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellowLight,
  },
  innercontainer: {
    margin: 15,
    backgroundColor: Colors.orange,
    flexDirection: "row",
    borderRadius: 12,
    padding: 6,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 24,
    margin: 10,
    color: Colors.skin,
  },
  button: {
    borderRadius: 6,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.45,
    shadowRadius: 4,
  },
});
