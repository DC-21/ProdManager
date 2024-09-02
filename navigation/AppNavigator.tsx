import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/products/HomeScreen";
import DrawerContent from "./DrawerNavigator";
import Header from "../components/Header";
import { navigationItems } from "../utils/navigation-items";
import LoginScreen from "../screens/auth/Login";
import GetStartedScreen from "../screens/products/GetStartedScreen";
import AddProductScreen from "../screens/products/AddProductsScreen";
import CategoryScreen from "../screens/products/Category";
import ProductDetailScreen from "../screens/products/ProductDetailsScreen";
import UpdateProductScreen from "../screens/products/UpdateProductScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProduct"
        component={UpdateProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppDrawer"
        component={AppDrawer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppDrawer: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerStyle: { width: 240 },
        header: () => <Header navigation={navigation} />,
      })}
    >
      {navigationItems.map((item, index) => (
        <Drawer.Screen
          key={index}
          name={item.route}
          component={
            item.route === "HomeStack"
              ? HomeStackNavigator
              : item.route === "Add Product"
              ? AddProductScreen
              : CategoryScreen
          }
          initialParams={
            item.route !== "HomeStack" && item.route !== "Add Product"
              ? { category: item.label }
              : undefined
          }
        />
      ))}
    </Drawer.Navigator>
  );
};

export default AppNavigator;
