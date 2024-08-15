import RNFS from "react-native-fs";
import { Product } from "../types/interface";

const FILE_PATH = `${RNFS.DocumentDirectoryPath}/products.json`;

export const loadInitialProducts = async (): Promise<Product[]> => {
  try {
    console.log("Attempting to load initial products from assets...");
    const initialData = require("../assets/products.json");
    console.log("Initial products loaded successfully:", initialData);
    return initialData;
  } catch (error) {
    console.error("Failed to load initial products:", error);
    return [];
  }
};

export const loadProductsFromFile = async (): Promise<Product[]> => {
  try {
    console.log("Checking if products file exists at:", FILE_PATH);
    const fileExists = await RNFS.exists(FILE_PATH);

    if (!fileExists) {
      console.log("Products file does not exist. Loading initial products...");
      const initialProducts = await loadInitialProducts();
      console.log("Writing initial products to file...");
      await RNFS.writeFile(FILE_PATH, JSON.stringify(initialProducts), "utf8");
      console.log("Initial products written to file successfully.");
    } else {
      console.log("Products file exists. Loading products from file...");
    }

    const fileContents = await RNFS.readFile(FILE_PATH);
    console.log("Products file read successfully:", fileContents);
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to load products from file:", error);
    return [];
  }
};

export const saveProductsToFile = async (products: Product[]) => {
  try {
    console.log("Saving products to file...");
    await RNFS.writeFile(FILE_PATH, JSON.stringify(products), "utf8");
    console.log("Products saved successfully.");
  } catch (error) {
    console.error("Failed to save products to file:", error);
  }
};
