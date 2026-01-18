import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../components/Colors";

function InputPlace({ label, onUpdateValue, value }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default InputPlace;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: Colors.orange,
    marginBottom: 4,
    fontSize: 17,
    fontWeight: "500",
  },
  input: {
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 2,
    borderColor: Colors.orange,
    color: Colors.red,
  },
});
