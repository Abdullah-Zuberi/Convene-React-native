import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import useDimensions from "../../hooks/useDimensions";
import { HeadingText, SubHeadingText } from "../../components/styled-text";
import { Input, PwdInput } from "../../components/ui/input";
import { PrimaryButton } from "../../components/ui/button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/useAuthStore";
import { validateEmail, validatePassword } from "../../utils/validateInput";
import { showMessage } from "react-native-flash-message";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();
  const { screenWidth, screenHeight } = useDimensions();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  async function handleLogin() {
    // input validation
    if (password === "" || email === "") {
      showMessage({
        message: "Please fill in all fields!",
        type: "danger",
        icon: "danger",
      });
      return;
    }

    if (!validateEmail(email.trim())) {
      showMessage({
        message: "Make sure your email is in the right format!",
        type: "danger",
        icon: "danger",
      });
      return;
    }

    if (!validatePassword(password)) {
      showMessage({
        message: "Your password is less than 8 characters!",
        type: "danger",
        icon: "danger",
      });
      return;
    }

    setLoading(true);

    // You can remove the Firebase-related functions and calls from here
    // Fetch user data and set states (this part was related to Firebase)

    setLoading(false);
    setIsLoggedIn(true); // For testing purposes since we removed Firebase authentication
  }

  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 24,
      }}
    >
      <View>
        <HeadingText style={{ color: "coral" }}>
          Welcome back to convene
        </HeadingText>
        <SubHeadingText onPress={() => navigate("signup")}>
          Don't have an account? Create one now
        </SubHeadingText>
      </View>

      <View style={{ marginTop: 32, gap: 16 }}>
        <Input
          placeholder="Email address"
          onChangeText={(e) => setEmail(e)}
          value={email}
        />
        <View style={{ gap: 8 }}>
          <PwdInput
            placeholder="Password"
            onChangeText={(e) => setPassword(e)}
            value={password}
          />
          <SubHeadingText onPress={() => navigate("forgot-password")}>
            Forgot password? Reset it
          </SubHeadingText>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 24,
          width: "100%",
          alignSelf: "center",
        }}
      >
        <PrimaryButton
          title={loading ? <ActivityIndicator color={"#fff"} /> : "Login"}
          onPress={handleLogin}
        />
      </View>
    </View>
  );
}
