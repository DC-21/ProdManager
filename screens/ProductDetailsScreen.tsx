import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

interface Product {
  id: string;
  name: string;
  price: string;
}

const ProductListScreen: React.FC = () => {
  const products: Product[] = [
    { id: "1", name: "Product 1", price: "$10" },
    { id: "2", name: "Product 2", price: "$20" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List Screen</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productName: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
  },
});

export default ProductListScreen;
