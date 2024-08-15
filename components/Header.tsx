import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useDrawerStatus } from "@react-navigation/drawer";

type RootDrawerParamList = {
  HomeStack: undefined;
  Electronics: { category: string };
  Clothing: { category: string };
  "Home Appliances": { category: string };
  Books: { category: string };
  "Add Product": undefined;
};

type HeaderProps = {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  const isDrawerOpen = useDrawerStatus() === "open";

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      navigation.closeDrawer();
    } else {
      navigation.openDrawer();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButtonContainer}
        onPress={toggleDrawer}
      >
        <Text style={styles.menuButton}>{isDrawerOpen ? "X" : "☰"}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>ProdManager</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#f8f8f8",
    height: 60,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButtonContainer: {
    position: "absolute",
    left: 16,
    height: "100%",
    justifyContent: "center",
  },
  menuButton: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 40,
    marginRight: 40,
  },
});

export default Header;
