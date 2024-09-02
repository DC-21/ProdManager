import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RootStackParamList } from "../types/interface";

type GetStartedScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "GetStarted"
>;

interface GetStartedScreenProps {
  navigation: GetStartedScreenNavigationProp;
}

const GetStartedScreen: React.FC<GetStartedScreenProps> = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate("AppDrawer");
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="rocket" size={100} color="#fff" />
      </View>
      <Text style={styles.welcomeText}>Welcome to ProdManager!</Text>
      <Text style={styles.paragraph}>
        ProdManager helps you manage and streamline your projects efficiently.
        With intuitive features and a user-friendly interface, you can stay
        organized and focused on what matters most.
      </Text>
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Let's Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eb9e37",
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  startButtonText: {
    color: "#eb9e37",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default GetStartedScreen;
