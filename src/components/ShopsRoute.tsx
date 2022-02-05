import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, ActivityIndicator, Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getPreciseDistance, convertDistance } from "geolib";
import * as Location from "expo-location";

const GET_COMPANIES = gql`
  query GetPublicCompanies {
    getCompanies {
      nick
      schedule
      location
      name
      coords {
        latitude
        longitude
      }
    }
  }
`;

interface CompanyInterface {
  _id: any;
  nick: string;
  name: string;
  location: string;
  description: string;
  ownerId: any;
  active: boolean;
  coords: {
    longitude: number;
    latitude: number;
  };
  schedule: string;
  maxProductActive: number;
  planPayDate: string;
}

interface Props {
  company: CompanyInterface;
  navigation: any;
  location: any;
}

const CompanyItem = ({ company, location, navigation }: Props) => (
  <Card style={styles.shopList}>
    <Card.Title title={company.name} subtitle={company.location} />
    <Card.Content>
      {location ? (
        <Text>
          {convertDistance(
            getPreciseDistance(location, company.coords),
            "km"
          ).toFixed(3)}
          km
        </Text>
      ) : null}
    </Card.Content>
    <Card.Actions>
      <Button
        onPress={() => navigation.navigate("ShopView", { nick: company.nick })}
      >
        Entrar
      </Button>
    </Card.Actions>
  </Card>
);

const HomeScreen = () => {
  const { loading, error, data } = useQuery(GET_COMPANIES, {
    pollInterval: 1000,
  });
  const navigation = useNavigation();
  const [location, setLocation] = useState<any>("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);
  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: "65%" }}
        size="large"
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
  const { getCompanies } = data;
  return (
    <ScrollView>
      {getCompanies.map((company: CompanyInterface) => (
        <CompanyItem
          key={company._id}
          company={company}
          location={location}
          navigation={navigation}
        />
      ))}
      {errorMsg ? <Text>{errorMsg}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shopList: {
    marginTop: 20,
  },
});

export default HomeScreen;
