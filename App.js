import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MainScreen from "./screens/MainScreen";
import AddNewPlace from "./screens/AddNewPlace";
import UpdatePlace from "./screens/UpdatePlace";
import AuthContextProvider from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./ui/IconButton";
import { useNavigation } from "@react-navigation/native";
import UniqueContextProvider from "./context/UniqueContext";
import AddStock from "./screens2/AddStock";
import EditStock from "./screens2/EditStock";
import AllStock from "./screens2/AllStock";
import DetailsScreen from "./screens2/DetailsScreen";
import MoreScreen from "./screens2/MoreScreen";
import InScreen from "./screens2/InScreen";
import OutScreen from "./screens2/OutScreen";
import InStock from "./screens2/InStock";
import OutStock from "./screens2/OutStock";
import InOutContextProvider from "./context/InOutContext";
import Colors from "./components/Colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          title: null,
          headerStyle: {
            backgroundColor: Colors.yellowDark,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color: Colors.red,
          },
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: "WELCOME NEW USER",
          headerShown: false,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
        }}
      />
    </Stack.Navigator>
  );
}
function MyTabs() {
  const navigation = useNavigation();
  function goToAddStock() {
    navigation.navigate("AddStock");
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.yellowMedium,
        },
        headerTitleStyle: {
          color: Colors.orange,
          fontWeight: "800",
        },
        tabBarStyle: { backgroundColor: Colors.yellowMedium },
        tabBarActiveBackgroundColor: Colors.yellowDark,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="AllStock"
        component={AllStock}
        options={{
          title: "All Stock",
          headerRight: () => (
            <IconButton
              name="add-outline"
              size={35}
              color={Colors.orange}
              onClick={goToAddStock}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder-outline" size={35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          title: "Detail",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps-outline" size={35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{
          title: "More Screen",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="OutScreen"
        component={OutScreen}
        options={{
          title: "OUT DATA",
          tabBarActiveTintColor: Colors.red,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-down-outline" size={35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="InScreen"
        component={InScreen}
        options={{
          title: "IN DATA",
          tabBarActiveTintColor: Colors.greenDark,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up-outline" size={35} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App2() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.yellowMedium,
        },
        headerTitleStyle: {
          color: Colors.orange,
          fontWeight: "800",
        },
      }}
    >
      <Stack.Screen
        name="Tab"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditStock"
        component={EditStock}
        options={{ title: "Edit Item", presentation: "modal" }}
      />
      <Stack.Screen
        name="AddStock"
        component={AddStock}
        options={{ title: "Add Item", presentation: "modal" }}
      />
      <Stack.Screen
        name="InStock"
        component={InStock}
        options={{ title: "IN STOCK", presentation: "modal" }}
      />
      <Stack.Screen
        name="OutStock"
        component={OutStock}
        options={{ title: "OUT STOCK", presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const navigation = useNavigation();
  function goToAddScreen() {
    navigation.navigate("AddNewPlace");
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.yellowMedium,
        },
        headerTitleStyle: {
          color: Colors.orange,
          fontWeight: "800",
        },
      }}
    >
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: "Your Places",
          headerRight: () => (
            <IconButton
              name="add-outline"
              size={35}
              color={Colors.orange}
              onClick={goToAddScreen}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddNewPlace"
        component={AddNewPlace}
        options={{ title: "Add", presentation: "modal" }}
      />
      <Stack.Screen
        name="UpdatePlace"
        component={UpdatePlace}
        options={{ title: "Update", presentation: "modal" }}
      />
      <Stack.Screen
        name="App2"
        component={App2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authConxt = useContext(AuthContext); //this cannot be used in App since <AuthContextProvider> is not covering App
  //therfore we have to make a child component Navigation
  return (
    <NavigationContainer>
      {!authConxt.isAuthenticated && <AuthStack />}
      {authConxt.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <UniqueContextProvider>
          <InOutContextProvider>
            <StatusBar style="auto" />
            <Navigation />
          </InOutContextProvider>
        </UniqueContextProvider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
