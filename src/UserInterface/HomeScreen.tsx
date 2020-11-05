import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";
import ProductsRoute from "../components/ProductsRoute";
import ShopRoute from "../components/Shops";

const ProfileRoute = () => (
  <ActivityIndicator
    style={{ marginTop: "65%" }}
    animating={true}
    size='large'
    color={Colors.red800}
  />
);

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "products", title: "Productos", icon: "food" },
    { key: "shop", title: "Tiendas", icon: "seal" },
    { key: "profile", title: "Perfil", icon: "account-circle" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    products: ProductsRoute,
    shop: ShopRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const HomeScreen = () => {
  return <BottomNav />;
};

export default HomeScreen;
