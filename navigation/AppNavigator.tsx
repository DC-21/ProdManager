// AppNavigator.tsx
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import Header from "../components/Header";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        header: () => <Header />,
        drawerStyle: { width: 240 },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
