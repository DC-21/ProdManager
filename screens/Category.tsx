import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { loadProductsFromLocalStorage } from "../utils/localstorage";
import { Product } from "../types/interface";

const CategoryScreen: React.FC = ({ route, navigation }: any) => {
  const { category } = route.params;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const savedProducts = await loadProductsFromLocalStorage();
        setProducts(
          savedProducts.filter(
            (product: Product) => product.category === category
          )
        );
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: item.id })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category}</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 8,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  itemInfo: {
    marginTop: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
});

export default CategoryScreen;
