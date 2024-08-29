import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

const navigationItems = [
  { label: "Home", route: "HomeStack", icon: "home-outline" },
  { label: "Electronics", route: "Electronics", icon: "laptop-outline" },
  { label: "Clothing", route: "Clothing", icon: "shirt-outline" },
  { label: "Home Appliances", route: "Home Appliances", icon: "tv-outline" },
  { label: "Books", route: "Books", icon: "book-outline" },
  { label: "Add Product", route: "Add Product", icon: "add-circle-outline" },
];

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => props.navigation.closeDrawer()}
      >
        <Ionicons name="close" size={30} color=" #14B8A6" />
      </TouchableOpacity>
      <View style={styles.navItems}>
        {navigationItems.map((item:any, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => props.navigation.navigate(item.route)}
          >
            <Ionicons name={item.icon} size={24} color="#000" style={styles.icon} />
            <Text style={styles.item}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
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
  navItems: {
    flex: 1,
    backgroundColor: " #14B8A6",
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  item: {
    fontSize: 18,
  },
});

export default DrawerContent;
