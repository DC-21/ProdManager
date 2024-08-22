import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { loadProductsFromLocalStorage } from "../utils/localstorage";

const ProductDetailScreen: React.FC<any> = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductFromLocalStorage = async () => {
      try {
        const savedProducts = await loadProductsFromLocalStorage();
        const foundProduct = savedProducts.find((p: any) => p.id === productId);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        console.error("Failed to load product:", error);
        setError("Failed to load product details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductFromLocalStorage();
  }, [productId]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>No product found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <View style={styles.detailsContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>K{product.price}</Text>
        </View>
      </View>
    </ScrollView>
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
    marginBottom: 16,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 16,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  category: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
