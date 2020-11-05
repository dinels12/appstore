import React from "react";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaulthTheme,
} from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Main from "./src/Main";
import merge from "deepmerge";

const CombinedDarkTheme = merge(PaperDefaulthTheme, NavigationDefaultTheme);

const client = new ApolloClient({
  uri: "https://prototype-storeapp.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
