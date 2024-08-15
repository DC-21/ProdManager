import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SideMenuProps {
  navigation: any;
}

const SideMenu: React.FC<SideMenuProps> = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Text style={styles.menuItem}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Products")}>
      <Text style={styles.menuItem}>Products</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
  },
});

export default SideMenu;
