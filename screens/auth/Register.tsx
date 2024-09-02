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
import { RegisterCredentials, RootStackParamList } from "../../types/interface";
import { validateEmail, validatePassword } from "../../utils/validation";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleRegister = () => {
    const { name, email, password, phone } = credentials;

    if (!name) {
      Alert.alert("Missing Name", "Please enter your name.");
      return;
    }

    if (!email) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }

    if (!phone) {
      Alert.alert("Missing Phone", "Please enter your phone number.");
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

    navigation.navigate("Login");
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
          <Text style={styles.headerText}>REGISTER</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Icon name="person" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={credentials.name}
              onChangeText={(text) =>
                setCredentials({ ...credentials, name: text })
              }
              placeholderTextColor="#ccc"
            />
          </View>
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
            <Icon name="phone" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={credentials.phone}
              onChangeText={(text) =>
                setCredentials({ ...credentials, phone: text })
              }
              keyboardType="phone-pad"
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
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.normalText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginText}>Login</Text>
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
  registerButton: {
    width: "100%",
    backgroundColor: "#eb9e37",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  normalText: {
    color: "#708090",
  },
  loginText: {
    color: "#eb9e37",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
