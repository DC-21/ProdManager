// DrawerContent.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drawer Menu</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
        <Text style={styles.item}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Details")}>
        <Text style={styles.item}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default DrawerContent;
