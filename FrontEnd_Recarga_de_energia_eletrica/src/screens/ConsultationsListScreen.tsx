import React, { useState, useCallback } from "react";
import { ImageBackground, RefreshControl } from "react-native";
import { NativeBaseProvider, FlatList, Box, Text, Button, VStack, HStack, Icon, Input, Modal } from "native-base";
import { getConsultations } from "../api/consultations";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [updatedData, setUpdatedData] = useState({ date: "", doctor: "", specialty: "", status: "" });

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["userToken", "username"]);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const fetchConsultations = async () => {
    try {
      setError(null);
      const response = await getConsultations();
      setConsultations(response.consultations);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar consultas");
    }
  };

  const deleteConsultation = async (id: number) => {
    try {
      const response = await fetch(`/consultations/${id}`, {
        method: 'DELETE', // Método HTTP para exclusão
        headers: {
          'Content-Type': 'application/json', // Informando que a requisição é em JSON
        },
      });
  
      if (response.ok) {
        // Se a exclusão for bem-sucedida, atualiza a lista de consultas
        setConsultations((prevConsultations) =>
          prevConsultations.filter((consultation) => consultation.id !== id)
        );
        console.log("Consulta excluída com sucesso.");
      } else {
        const errorData = await response.json(); // Pega a resposta de erro
        console.error("Erro ao excluir consulta:", errorData.message || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro desconhecido ao excluir consulta:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchConsultations();
    setRefreshing(false);
  };

  const updateConsultation = async () => {
    if (selectedConsultation) {
      try {
        // Cria o objeto com os dados atualizados
        const updatedConsultation = { 
          date: updatedData.date, 
          doctor: updatedData.doctor, 
          specialty: updatedData.specialty, 
          status: updatedData.status 
        };
  
        // Faz a requisição para o backend
        const response = await axios.put(
          `http://localhost:8081/consultations/${selectedConsultation.id}`,
          updatedConsultation
        );
  
        if (response.status === 200) {
          // Atualiza a lista de consultas no frontend
          setConsultations((prev) =>
            prev.map((consultation) =>
              consultation.id === selectedConsultation.id ? { ...consultation, ...updatedData } : consultation
            )
          );
          setEditModalVisible(false);
          setSelectedConsultation(null);
          setUpdatedData({ date: "", doctor: "", specialty: "", status: "" });
        } else {
          setError("Erro ao atualizar consulta. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao atualizar consulta:", error);
        setError("Erro ao atualizar consulta. Tente novamente.");
      }
    }
  };
  

  const openEditModal = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setUpdatedData({
      date: consultation.date,
      doctor: consultation.doctor,
      specialty: consultation.specialty,
      status: consultation.status,
    });
    setEditModalVisible(true);
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
      shadow={2}
    >


      <HStack justifyContent="center" alignItems="center" mb={3}>
        <Text fontWeight="bold" fontSize="lg" color="primary.600">
          Detalhes do Status
        </Text>
      </HStack>
      <VStack space={2}>
        <Text fontWeight="bold">Usuário: {item.username}</Text>
        <Text>Fonte de Energia Utilizada: {item.specialty}</Text>
        <Text>Período do dia: {item.doctor}</Text>
        <Text>Data: {new Date(item.date).toLocaleDateString()}</Text>
        <Text fontWeight="bold" color="emerald.500">Status: {item.status}</Text>
      </VStack>
      <Box mt={4} py={2} bg="coolGray.50" borderRadius="md">
        <HStack justifyContent="space-between" space={2}>
          <Button
            onPress={() => deleteConsultation(item.id)}
            colorScheme="red"
            startIcon={<Icon as={MaterialIcons} name="delete" size="sm" />}
          >
            Apagar
          </Button>
          <Button
            onPress={() => openEditModal(item)}
            colorScheme="blue"
            startIcon={<Icon as={MaterialIcons} name="edit" size="sm" />}
          >
            Atualizar
          </Button>
        </HStack>
      </Box>
    </Box>
  );

  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require("../../assets/tela1.jpg")}
        style={{ flex: 1, width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      />
      <Box flex={1} bg="" p={4}>
        <HStack mb={4} justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="bold">Status de Recarga</Text>
          <Button onPress={handleLogout} colorScheme="red" leftIcon={<Icon as={MaterialIcons} name="logout" size="sm" color="white" />}>
            Sair
          </Button>
        </HStack>
        <Button 
          onPress={() => navigation.navigate('ScheduleConsultation')}
          colorScheme="green"
          mb={4}
          fontFamily="sans-serif" 
        >
          Agendar Recarga do seu veículo
        </Button>
        <FlatList
          data={consultations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
        <Modal isOpen={editModalVisible} onClose={() => setEditModalVisible(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Editar Consulta</Modal.Header>
            <Modal.Body>
              <Input
                placeholder="Data"
                value={updatedData.date}
                onChangeText={(text) => setUpdatedData((prev) => ({ ...prev, date: text }))}
                mb={3}
              />
              <Input
                placeholder="Fonte de Energia"
                value={updatedData.specialty}
                onChangeText={(text) => setUpdatedData((prev) => ({ ...prev, specialty: text }))}
                mb={3}
              />
              <Input
                placeholder="Período"
                value={updatedData.doctor}
                onChangeText={(text) => setUpdatedData((prev) => ({ ...prev, doctor: text }))}
                mb={3}
              />
              <Input
                placeholder="Status"
                value={updatedData.status}
                onChangeText={(text) => setUpdatedData((prev) => ({ ...prev, status: text }))}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onPress={updateConsultation} colorScheme="blue">
                Salvar
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
    </NativeBaseProvider>
  );
};

export default ConsultationsListScreen;
