import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import useDimensions from "../../hooks/useDimensions";
import {
  BoldText,
  HeadingText,
  SubHeadingText,
} from "../../components/styled-text";
import { Input, PwdInput } from "../../components/ui/input";
import { PrimaryButton } from "../../components/ui/button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";
import {
  validateEmail,
  validateMatchPassword,
  validatePassword,
} from "../../utils/validateInput";
import * as ImagePicker from "expo-image-picker";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>("");

  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();
  const { screenWidth, screenHeight } = useDimensions();

  async function selectImageFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function handleSignup() {
    // Input validation
    if (
      password === "" ||
      email === "" ||
      confirmPassword === "" ||
      username === ""
    ) {
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

    if (!validatePassword(password) || !validatePassword(confirmPassword)) {
      showMessage({
        message: "Your password should be at least 8 characters!",
        type: "danger",
        icon: "danger",
      });
      return;
    }

    if (!validateMatchPassword(password, confirmPassword)) {
      showMessage({
        message: "Your passwords do not match!",
        type: "danger",
        icon: "danger",
      });
      return;
    }

    // Handle the signup process here

    // Your signup logic here

    setLoading(true);

    // Simulating an asynchronous signup process for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);

    showMessage({
      message: "Account created successfully!",
      type: "success",
      icon: "success",
    });

    navigate("login");
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
          hey there, welcome to convene
        </HeadingText>
        <SubHeadingText onPress={() => navigate("login")}>
          already have an account? login
        </SubHeadingText>
      </View>

      <View style={{ marginTop: 32, gap: 16 }}>
        <Input
          placeholder="create a unique username"
          onChangeText={(e) => setUsername(e)}
          value={username}
        />
        <Input
          placeholder="email address"
          onChangeText={(e) => setEmail(e)}
          value={email}
        />
        <PwdInput
          placeholder="password"
          onChangeText={(e) => setPassword(e)}
          value={password}
        />
        <PwdInput
          placeholder="confirm password"
          onChangeText={(e) => setConfirmPassword(e)}
          value={confirmPassword}
        />
        <View
          style={{
            gap: 16,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={selectImageFromGallery}
            style={{
              width: 80,
              height: 80,
              borderRadius: 60,
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: "#d3d3d3",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 120, height: 120, borderRadius: 60 }}
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="ios-person-outline" size={20} color={"#000"} />
            )}
          </TouchableOpacity>
          <BoldText>upload an avatar</BoldText>
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
          title={loading ? <ActivityIndicator color={"#fff"} /> : "sign up"}
          onPress={handleSignup}
        />
      </View>
    </View>
  );
}
