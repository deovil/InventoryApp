import {
  StyleSheet,
  Alert,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { signupUser } from "../util/http";
import { storeData } from "../util/datahttp";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../components/Colors";
import AuthContent from "../authentication/AuthContent";

export default function SignupScreen() {
  const navigation = useNavigation();

  async function signupHandler({ email, password, username }) {
    try {
      const userId = await signupUser(email, password);
      const object = {
        userId: userId,
        username: username,
      };
      await storeData(userId, object);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("SignUp Failed", "Please try Again");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        style={styles.container}
        extraHeight={250}
        enableOnAndroid={true}
      >
        <LinearGradient
          colors={[Colors.yellowDark, Colors.yellowLight]}
          style={styles.container}
        >
          <Text style={styles.text}>Create New User</Text>
          <AuthContent onAuthenticate={signupHandler} />
        </LinearGradient>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellowLight,
  },
  text: {
    marginTop: 100,
    marginLeft: 30,
    fontSize: 30,
    color: Colors.orange,
    fontWeight: "bold",
  },
});
