import React, { useState } from "react";
import {
  NativeBaseProvider,
  Box,
  Button,
  Input,
  Center,
  Text,
} from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator"; 
import { register } from "../api/auth";

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
      <Center flex={1} bg="white">
        <Box>
          <Input
            placeholder="Nome de Usuário"
            mb={4}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="Senha"
            mb={4}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Input
            placeholder="Confirmar Senha"
            mb={4}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {message ? <Text color="red.500">{message}</Text> : null}
          <Button onPress={handleSignUp}>Criar Conta</Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default SignUpScreen;
