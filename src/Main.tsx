import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "../components/context";
import HomeScreen from "./UserInterface/HomeScreen";
import ShopView from "./components/ShopView";
import Auth from "./Auth/index";

const Stack = createStackNavigator();

const Main = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: null,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: null,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (email: string, password: string, token: string) => {
        if (email && password != "" && token) {
          try {
            await AsyncStorage.setItem("token", token);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({ type: "LOGIN", token });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("token");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: async (email: string, password: string, token: string) => {
        if (email && password != "" && token) {
          try {
            await AsyncStorage.setItem("token", token);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({ type: "REGISTER", token });
      },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let token = null;
      try {
        token = await AsyncStorage.getItem("token");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "REGISTER", token });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View>
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          animating={true}
          size="large"
          color={Colors.red400}
        />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ShopView" component={ShopView} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      )}
    </AuthContext.Provider>
  );
};

export default Main;
