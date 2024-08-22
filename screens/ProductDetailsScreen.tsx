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
import {Product} from "../types/interface"
import { loadProductsFromLocalStorage } from "../utils/localstorage";




const ProductDetailScreen: React.FC<any> = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Define the fetchProductFromLocalStorage function outside of useEffect
  const fetchProductFromLocalStorage = async () => {
    try {
      const savedProducts = await loadProductsFromLocalStorage();
      const foundProduct = savedProducts.find((p: Product) => p.id === productId);

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

  useEffect(() => {
    fetchProductFromLocalStorage();
  }, [productId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
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
    Alert.alert("Error", "Product not found.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <View style={styles.detailsContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          accessibilityLabel={product.title} // Added accessibilityLabel
        />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Centering the loading indicator
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
