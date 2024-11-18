import React, { useState } from "react";
import {
  NativeBaseProvider,
  Box,
  Button,
  Input,
  Center,
  Text,
  VStack,
} from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator"; 
import { register } from "../api/auth";
import { ImageBackground } from "react-native";

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen = ({ navigation }: Props) => {
  // Estado para armazenar os valores dos campos
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    if (!username || !password || !confirmPassword) {
      setMessage("Todos os campos são obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    try {
      await register(username, password, confirmPassword);
      setMessage("Usuário registrado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro:", error);
      setMessage(error instanceof Error ? error.message : "Erro ao cadastrar usuário.");
    }
  };

  return (
    <NativeBaseProvider>
      <ImageBackground
      source={require('../../assets/planodefundo3.jpg')} 
      style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      ></ImageBackground>     
      <Center flex={1}>
      <Box 
            width="80%" // Largura menor para o centro
            bg="rgba(255, 255, 255, 0.95)" 
            p={6} 
            borderRadius="lg" // Bordas arredondadas para o efeito de cartão
            shadow={2} // Sombra para dar destaque
          >
              <VStack space={5}>
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color="green.500"
                textAlign="center"
                mb={4}>Cadastre-se</Text>
          <Input
            placeholder="Nome de Usuário"
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
            value={username}
            onChangeText={setUsername}
          />
          <Input
                placeholder="Senha"
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
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Input
            placeholder="Confirmar Senha"
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
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {message ? <Text color="red.500">{message}</Text> : null}
          <Button onPress={handleSignUp} 
                bg="green.500"
                _pressed={{ bg: "green.700" }}
                size="lg"
                rounded="lg"
                shadow={3}
                _hover={{
                  backgroundColor: "green.600",
                }}>Criar Conta</Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default SignUpScreen;
