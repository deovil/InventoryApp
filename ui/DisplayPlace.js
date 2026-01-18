import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../components/Colors";

export default function DisplayPlace({ name, onClick, token }) {
  const navigation = useNavigation();

  function press() {
    onClick(name, token);
  }

  function EditPlace() {
    function editHandler() {
      navigation.navigate("UpdatePlace", {
        newPlaceToken: token,
        newPlaceName: name,
      });
    }
    return (
      <View>
        <Pressable
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.pressed,
          ]}
          onPress={editHandler}
        >
          <Text style={styles.editText}>EDIT</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <Pressable
      onPress={press}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: Colors.orangeLight },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.innercontainer}>
        <Text style={styles.text}>{name}</Text>
        {EditPlace()}
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: Colors.yellowDark,
    borderRadius: 8,
    padding: 8,
  },
  text: {
    color: Colors.red,
    fontSize: 20,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.75,
  },
  editText: {
    color: Colors.orange,
    padding: 8,
    fontSize: 18,
  },
});
