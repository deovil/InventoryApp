import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../components/Colors";

function IconButton({ name, size, color, onClick }) {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onClick}
      >
        <View style={styles.container}>
          <Ionicons name={name} size={size} color={color}></Ionicons>
        </View>
      </Pressable>
    </View>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  outerContainer: {
    marginRight: 15,
  },
  button: {
    borderRadius: 6,
    backgroundColor: Colors.orangeLight,
    elevation: 2,
    shadowColor: Colors.orange,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  container: {},
});
