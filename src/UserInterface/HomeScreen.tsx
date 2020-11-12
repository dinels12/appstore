import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import ProductsRoute from "../components/ProductsRoute";
import ShopRoute from "../components/ShopsRoute";
import ProfileRoute from "../components/ProfileRoute";

const Dashboard = () => {
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

export default Dashboard;
