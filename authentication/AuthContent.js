import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "./AuthForm";
import Button from "../ui/Button";
import Colors from "../components/Colors";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    username: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, username, password, confirmPassword } = credentials;

    email = email.trim(); //trim removes the spaces
    password = password.trim();
    username = username.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;
    const usernameIsValid = username.length > 0;
    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!usernameIsValid || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        username: !usernameIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    if (isLogin) {
      onAuthenticate({ email, password });
    } else {
      onAuthenticate({ email, password, username });
    }
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <Button
          onPress={switchAuthModeHandler}
          color={isLogin ? "#00e6e6" : "#ffb3b3"}
        >
          {isLogin ? "Create a new user" : "Log in instead"}
        </Button>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.orangeLight,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
