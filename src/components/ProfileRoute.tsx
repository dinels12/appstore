import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "../../components/context";

interface Context {
  signIn: any;
  signOut: any;
  signUp: any;
}

const Profile = () => {
  const { signOut }: Context = React.useContext<any>(AuthContext);
  return <Button onPress={() => signOut()}>Salir</Button>;
};

const Main = () => {
  return <Profile />;
};

const styles = StyleSheet.create({
  activityStyle: {
    marginTop: "65%",
  },
});

export default Main;
