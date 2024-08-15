import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  loadProductsFromLocalStorage,
  saveProductsToLocalStorage,
} from "../utils/localstorage";
import { Picker } from "@react-native-picker/picker";
import { Product } from "../types/interface";
import productsJson from "../assets/products.json"; // Import your products from the JSON file

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let savedProducts = await loadProductsFromLocalStorage();

        if (savedProducts.length === 0) {
          console.log(
            "No products in local storage, adding default products..."
          );
          await saveProductsToLocalStorage(productsJson);
          savedProducts = productsJson;
        }

        setProducts(savedProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
  );

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
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Picker
        selectedValue={selectedCategory}
        style={styles.picker}
        onValueChange={(itemValue: string) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="All Categories" value="All" />
        <Picker.Item label="Electronics" value="Electronics" />
        <Picker.Item label="Clothing" value="Clothing" />
        <Picker.Item label="Home Appliances" value="Home Appliances" />
        <Picker.Item label="Books" value="Books" />
      </Picker>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        key={selectedCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  searchInput: {
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
  row: {
    justifyContent: "space-between", // Space items evenly in the row
  },
  item: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginBottom: 16, // Space between rows
    marginHorizontal: 8, // Space between columns
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width / 2 - 48, // Adjusted to account for margin
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

export default HomeScreen;
