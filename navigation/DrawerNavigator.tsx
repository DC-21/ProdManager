import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => props.navigation.closeDrawer()}
      >
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.navItems}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("HomeStack")}
        >
          <Text style={styles.item}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Electronics")}
        >
          <Text style={styles.item}>Electronics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Clothing")}>
          <Text style={styles.item}>Clothing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home Appliances")}
        >
          <Text style={styles.item}>Home Appliances</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Books")}>
          <Text style={styles.item}>Books</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Add Product")}
        >
          <Text style={styles.item}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderColor: "red",
    borderWidth: 1,
  },
  closeButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 30,
    color: "#000",
  },
  navItems: {
    flex: 1,
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default DrawerContent;
