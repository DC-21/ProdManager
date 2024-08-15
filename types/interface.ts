import { DrawerNavigationProp } from "@react-navigation/drawer";

export type RootDrawerParamList = {
  Home: undefined;
  Products: undefined;
  "Product Details": undefined;
};

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
}

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
  UpdateProduct: { productId: string };
};
