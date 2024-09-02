import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Product } from "../../types/interface";
import {
  loadProductsFromLocalStorage,
  saveProductsToLocalStorage,
} from "../../utils/localstorage";

const UpdateProductScreen: React.FC<any> = ({ route, navigation }: any) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const savedProducts = await loadProductsFromLocalStorage();
        const foundProduct = savedProducts.find((p: any) => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
          setTitle(foundProduct.title);
          setPrice(foundProduct.price);
          setDescription(foundProduct.description);
          setImage(foundProduct.image);
          setCategory(foundProduct.category);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleUpdateProduct = async () => {
    if (!title || !price || !description || !image || !category) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    const updatedProduct: Product = {
      id: productId,
      title,
      price,
      image,
      description,
      category,
    };

    try {
      const savedProducts = await loadProductsFromLocalStorage();
      const updatedProducts = savedProducts.map((p: any) =>
        p.id === productId ? updatedProduct : p
      );
      await saveProductsToLocalStorage(updatedProducts);

      setIsLoading(false);

      Alert.alert("Success", "Product updated successfully!");
      navigation.navigate("Home", { updatedProduct });
    } catch (error) {
      console.error("Failed to update product:", error);
      setIsLoading(false);
      Alert.alert("Error", "Failed to update product.");
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Image URL"
        value={image}
        onChangeText={setImage}
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue: string) => setCategory(itemValue)}
      >
        <Picker.Item label="Electronics" value="Electronics" />
        <Picker.Item label="Clothing" value="Clothing" />
        <Picker.Item label="Home Appliances" value="Home Appliances" />
        <Picker.Item label="Books" value="Books" />
      </Picker>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Update Product" onPress={handleUpdateProduct} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
});

export default UpdateProductScreen;
