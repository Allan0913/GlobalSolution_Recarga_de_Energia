import React, { useState } from "react";
import { ImageBackground, StyleSheet, Dimensions } from "react-native";
import { NativeBaseProvider, Box, Button, Input, Center, VStack, Text, Icon, Pressable } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Alert as RNAlert } from "react-native";
import { login } from "../api/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState(false);

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('username', username);
      navigation.navigate("ConsultationsList");
    } catch (err: unknown) {
      if (err instanceof Error) {
        RNAlert.alert("Erro", err.message);
      } else {
        RNAlert.alert("Erro", "Ocorreu um erro inesperado.");
      }
    }
  };

  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require('../../assets/planodefundo1.png')}
        style={styles.backgroundImage}
      >
        <Center flex={1}>
          <Box
            bg="rgba(255, 255, 255, 0.95)"
            p={8}
            rounded="xl"
            width={width * 0.9}
            maxWidth={400}
            shadow={5}
          >
            <VStack space={5}>
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color="green.500"
                textAlign="center"
                mb={4}
              >
                Tela de Login
              </Text>

              <Input
                placeholder="Usuário"
                size="lg"
                borderRadius="lg"
                borderColor="green.500"
                backgroundColor="white"
                _focus={{
                  borderColor: "green.500",
                  backgroundColor: "white",
                }}
                _hover={{
                  borderColor: "green.400",
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml={2}
                    color="green.500"
                  />
                }
                value={username}
                onChangeText={setUsername}
              />

              <Input
                placeholder="Senha"
                size="lg"
                borderRadius="lg"
                borderColor="green.500"
                backgroundColor="white"
                type={show ? "text" : "password"}
                _focus={{
                  borderColor: "green.500",
                  backgroundColor: "white",
                }}
                _hover={{
                  borderColor: "green.400",
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml={2}
                    color="green.500"
                  />
                }
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                      size={5}
                      mr={2}
                      color="muted.400"
                    />
                  </Pressable>
                }
                value={password}
                onChangeText={setPassword}
              />

              <Button
                onPress={handleLogin}
                bg="green.500"
                _pressed={{ bg: "green.700" }}
                size="lg"
                rounded="lg"
                shadow={3}
                _hover={{
                  backgroundColor: "green.600",
                }}
              >
                Entrar
              </Button>

              <Button
                onPress={() => navigation.navigate("SignUp")}
                variant="outline"
                borderColor="green.500"
                _text={{ color: "green.500" }}
                size="lg"
                rounded="lg"
                _pressed={{
                  bg: "green.100",
                }}
              >
                Criar Conta
              </Button>
            </VStack>
          </Box>
        </Center>
      </ImageBackground>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default LoginScreen;
