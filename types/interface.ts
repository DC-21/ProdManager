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

export type IconNames =
  | "home-outline"
  | "laptop-outline"
  | "shirt-outline"
  | "tv-outline"
  | "book-outline"
  | "add-circle-outline";

export type NavigationItem = {
  label: string;
  route: string;
  icon: IconNames;
};
