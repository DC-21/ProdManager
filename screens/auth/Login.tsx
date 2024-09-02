import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginCredentials, RootStackParamList } from "../../types/interface";
import { validateEmail, validatePassword } from "../../utils/validation";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    const { email, password } = credentials;

    if (!email) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }

    if (!password) {
      Alert.alert("Missing Password", "Please enter your password.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 8 characters long and include both uppercase letters, lowercase letters, and numbers."
      );
      return;
    }

    navigation.navigate("GetStarted");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>WELCOME!!</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={credentials.email}
              onChangeText={(text) =>
                setCredentials({ ...credentials, email: text })
              }
              keyboardType="email-address"
              placeholderTextColor="#ccc"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={credentials.password}
              onChangeText={(text) =>
                setCredentials({ ...credentials, password: text })
              }
              secureTextEntry
              placeholderTextColor="#ccc"
            />
          </View>
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={styles.normalText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eb9e37",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 35,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    flex: 0.5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    color: "#000",
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  forgotPasswordText: {
    color: "#708090",
    marginVertical: 5,
    fontStyle: "italic",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#eb9e37",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  normalText: {
    color: "#708090",
  },
  registerText: {
    color: "#eb9e37",
    fontWeight: "bold",
  },
});

export default LoginScreen;
