import React from "react";
import { ScrollView, View, Text } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";

interface Props {
  route?: any;
  navigation?: any;
  key?: string;
  product: ProductInterface;
}

const GET_PUBLICSHOP = gql`
  query GetPublicShop($nick: String!) {
    getPublicShop(nick: $nick) {
      products {
        _id
        title
        description
        imageURL
        price
      }
    }
  }
`;

interface ProductInterface {
  _id: string;
  title: string;
  description: string;
  imageURL: string;
  price: number;
}

export const ProductItem = ({ product }: Props) => (
  <Card>
    <Card.Content>
      <Title>{product.title}</Title>
      <Paragraph>{product.description}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: product.imageURL }} />
    <Card.Actions>
      <Button>${product.price}</Button>
    </Card.Actions>
  </Card>
);

const ShopView = ({ route }: Props) => {
  const { nick } = route.params;
  const { loading, error, data } = useQuery(GET_PUBLICSHOP, {
    variables: { nick },
  });
  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: "65%" }}
        size='large'
        animating={true}
        color={Colors.red800}
      />
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const {
    getPublicShop: { products },
  } = data;
  return (
    <ScrollView>
      {products.map((product: ProductInterface) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </ScrollView>
  );
};

export default ShopView;
