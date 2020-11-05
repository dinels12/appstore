import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./UserInterface/HomeScreen";
import ShopView from "./components/ShopView";
const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='ShopView' component={ShopView} />
    </Stack.Navigator>
  );
};

export default Main;
