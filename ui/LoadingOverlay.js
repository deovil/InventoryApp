import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Colors from "../components/Colors";
function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" color={Colors.orangeLight} />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.yellowLight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "bold",
    color: Colors.orange,
  },
});
