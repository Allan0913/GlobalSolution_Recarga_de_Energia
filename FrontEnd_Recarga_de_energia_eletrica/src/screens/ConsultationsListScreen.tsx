import React, { useState, useCallback } from "react";
import { RefreshControl } from "react-native";
import { NativeBaseProvider, FlatList, Box, Text, Button, VStack, HStack } from "native-base";
import { getConsultations } from "../api/consultations";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Consultation {
  id: number;
  date: string;
  doctor: string;
  specialty: string;
  status: string;
  username: string;
}

const ConsultationsListScreen = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      // Limpar os dados do AsyncStorage
      await AsyncStorage.multiRemove(['userToken', 'username']);
      // Navegar para a tela de login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const fetchConsultations = async () => {
    try {
      setError(null);
      const response = await getConsultations();
      setConsultations(response.consultations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar consultas');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchConsultations();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchConsultations();
    }, [])
  );

  const renderItem = ({ item }: { item: Consultation }) => (
    <Box 
      borderWidth={1}
      borderColor="coolGray.200"
      borderRadius="md"
      p={4}
      mb={2}
      bg="white"
    >
      <VStack space={2}>
        <Text fontWeight="bold">Paciente: {item.username}</Text>
        <Text>Data: {new Date(item.date).toLocaleDateString()}</Text>
        <Text>Médico: {item.doctor}</Text>
        <Text>Especialidade: {item.specialty}</Text>
        <Text>Status: {item.status}</Text>
      </VStack>
    </Box>
  );

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="white" p={4}>
        <HStack mb={4} justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="bold">Consultas</Text>
          <HStack space={2}>
            <Button 
              onPress={() => navigation.navigate('ScheduleConsultation')}
              colorScheme="blue"
            >
              Nova Consulta
            </Button>
            <Button 
              onPress={handleLogout}
              colorScheme="red"
            >
              Sair
            </Button>
          </HStack>
        </HStack>

        {error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          <FlatList
            data={consultations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </Box>
    </NativeBaseProvider>
  );
};

export default ConsultationsListScreen;
