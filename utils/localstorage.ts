import AsyncStorage from "@react-native-async-storage/async-storage";

const PRODUCTS_KEY = "products";

export const saveProductsToLocalStorage = async (products: any[]) => {
  try {
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Failed to save products to local storage:", error);
  }
};

export const loadProductsFromLocalStorage = async () => {
  try {
    const products = await AsyncStorage.getItem(PRODUCTS_KEY);
    console.log("products", products);
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error("Failed to load products from local storage:", error);
    return [];
  }
};
