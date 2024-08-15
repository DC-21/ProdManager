import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import {
  loadProductsFromLocalStorage,
  saveProductsToLocalStorage,
} from "../utils/localstorage";
import { Product } from "../types/interface";
import productsJson from "../assets/products.json";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch products from local storage or use default products
  const fetchProducts = async () => {
    try {
      let savedProducts = await loadProductsFromLocalStorage();

      if (savedProducts.length === 0) {
        console.log("No products in local storage, adding default products...");
        await saveProductsToLocalStorage(productsJson);
        savedProducts = productsJson;
      }

      setProducts(savedProducts);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
    }, [])
  );

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const updatedProducts = products.filter(
              (product) => product.id !== productId
            );
            setProducts(updatedProducts);
            await saveProductsToLocalStorage(updatedProducts);
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleUpdateProduct = (productId: string) => {
    navigation.navigate("UpdateProduct", { productId });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
  );

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetail", { productId: item.id })
        }
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.itemInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>K{item.price}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleUpdateProduct(item.id)}
        >
          <Icon name="create-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Icon name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    maxWidth: "48%",
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 8,
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width / 2 - 48,
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  iconButton: {
    padding: 8,
  },
});

export default HomeScreen;
