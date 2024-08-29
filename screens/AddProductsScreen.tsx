import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  saveProductsToLocalStorage,
  loadProductsFromLocalStorage,
} from "../utils/localstorage";
import { Product } from "../types/interface";
import { Picker } from "@react-native-picker/picker";

const AddProductScreen: React.FC = ({ navigation }: any) => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidInputs, setInvalidInputs] = useState({
    title: false,
    price: false,
    description: false,
    image: false,
    category: false,
  });

  const handleAddProduct = useCallback(async () => {
    setInvalidInputs({
      title: !title,
      price: !price,
      description: !description,
      image: !image,
      category: !category,
    });

    if (!title || !price || !description || !image || !category) {
      Alert.alert("Error", "Please fill in all fields and select a category.");
      return;
    }

    setIsLoading(true);

    const newProduct: Product = {
      id: Date.now().toString(),
      title,
      price,
      image,
      description,
      category,
    };

    try {
      const savedProducts = await loadProductsFromLocalStorage();
      const updatedProducts = [...savedProducts, newProduct];
      await saveProductsToLocalStorage(updatedProducts);

      setIsLoading(false);

      Alert.alert("Success", "Product added successfully!");

      navigation.navigate("Home", { updatedProducts });
    } catch (error) {
      console.error("Failed to add product:", error);
      setIsLoading(false);
      Alert.alert("Error", "Failed to add product.");
    }
  }, [title, price, description, image, category, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Product</Text>

      <TextInput
        style={[styles.input, invalidInputs.title && styles.invalidInput]}
        placeholder="Product Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, invalidInputs.price && styles.invalidInput]}
        placeholder="Product Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, invalidInputs.image && styles.invalidInput]}
        placeholder="Product Image URL"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={[styles.input, invalidInputs.description && styles.invalidInput]}
        placeholder="Product Description"
        value={description}
        onChangeText={setDescription}
      />

      <Picker
        selectedValue={category}
        style={[styles.picker, invalidInputs.category && styles.invalidInput]}
        onValueChange={(itemValue: string) => setCategory(itemValue)}
      >
        <Picker.Item label="Choose Category" value="" />
        <Picker.Item label="Electronics" value="Electronics" />
        <Picker.Item label="Clothing" value="Clothing" />
        <Picker.Item label="Home Appliances" value="Home Appliances" />
        <Picker.Item label="Books" value="Books" />
      </Picker>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Add Product" onPress={handleAddProduct} />
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
    textAlign: "center",
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
    marginBottom: 16,
  },
  invalidInput: {
    borderColor: "red",
  },
});

export default AddProductScreen;
