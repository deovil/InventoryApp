import { StyleSheet, View, Pressable, Text, Button } from "react-native";
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
      <View style={styles.editButton}>
        <Button
          onPress={editHandler}
          title="EDIT"
          color={Colors.orange}
        ></Button>
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
});
