import {
  StyleSheet,
  Alert,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { loginUser } from "../util/http";
import { fetchdata, fetchPlace } from "../util/datahttp";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { UniqueContext } from "../context/UniqueContext";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoadingOverlay from "../ui/LoadingOverlay";
import Colors from "../components/Colors";
import AuthContent from "../authentication/AuthContent";

export default function LoginScreen() {
  const authConxt = useContext(AuthContext);
  const uniqConxt = useContext(UniqueContext);
  const [fetching, setFetching] = useState(false);

  function loginHandler({ email, password }) {
    setFetching(true);
    LoginHandler();
    async function LoginHandler() {
      try {
        const userId = await loginUser(email, password);
        const username = await fetchdata(userId); //fetches the username from the user id in users file
        authConxt.setUsername(username);
        uniqConxt.setUserId(userId);
        const array = await fetchPlace(userId);
        uniqConxt.addPlace(array);
        setFetching(false); //this step must be done before the stack changes otherwise state update develops a problem
        authConxt.authenticate(userId);
      } catch (error) {
        Alert.alert("Authentication Failed", "Please try to Re Login");
        setFetching(false);
      }
    }
  }

  if (fetching) {
    return <LoadingOverlay message="Loading Your Places"></LoadingOverlay>;
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        style={styles.container}
        extraHeight={150}
        enableOnAndroid={true}
      >
        <LinearGradient
          colors={[Colors.yellowDark, Colors.yellowLight]}
          style={styles.container}
        >
          <Text style={styles.text}>Sign In</Text>
          <AuthContent isLogin onAuthenticate={loginHandler} />
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
