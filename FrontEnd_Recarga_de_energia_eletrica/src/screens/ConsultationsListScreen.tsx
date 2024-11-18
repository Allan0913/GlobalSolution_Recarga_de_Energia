import React, { useState, useCallback } from "react";
import { ImageBackground, RefreshControl } from "react-native";
import { NativeBaseProvider, FlatList, Box, Text, Button, VStack, HStack, Icon } from "native-base";
import { getConsultations } from "../api/consultations";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { MaterialIcons } from "@expo/vector-icons";
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
      shadow={2} // Sombra para dar mais destaque ao card
    >
      {/* Header */}
      <HStack justifyContent="center" alignItems="center" mb={3}>
        <Text fontWeight="bold" fontSize="lg" color="primary.600">
          Detalhes do Status
        </Text>
      </HStack>
  
      {/* Body */}
      <VStack space={2}>
        <Text fontWeight="bold">Usuário: {item.username}</Text>
        <Text>Fonte de Energia Utilizada: {item.doctor}</Text>
        <Text>Período do dia: {item.specialty}</Text>
        <Text>Data: {new Date(item.date).toLocaleDateString()}</Text>
        <Text fontWeight="bold" color="emerald.500">Status: {item.status}</Text>
      </VStack>
  
      {/* Footer */}
      <Box mt={4} py={2} bg="coolGray.50" borderRadius="md">
        <Text textAlign="center" fontWeight="medium" color="coolGray.700">
          Agendamento realizada com sucesso.
        </Text>
      </Box>
    </Box>
  );

  return (
    <NativeBaseProvider>
      <ImageBackground
      source={require('../../assets/tela1.jpg')} 
      style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      ></ImageBackground> 
      <Box flex={1} bg="" p={4}>
        <HStack mb={4} justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="bold" fontFamily="sans-serif">Status de Recarga</Text>
          <HStack space={2}>
            <Button 
              onPress={handleLogout}
              colorScheme="red"
              leftIcon={
                <Icon 
                  as={MaterialIcons} 
                  name="logout" 
                  size="sm" 
                  color="white" 
                />
              }
            >
              Sair
            </Button>
          </HStack>
        </HStack>

        <Button 
              onPress={() => navigation.navigate('ScheduleConsultation')}
              colorScheme="green"
              mb={4}
              fontFamily="sans-serif" 
            >
              
              Agendar Recarga do seu veículo
            </Button>

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
