import React, { useState } from "react";
import { NativeBaseProvider, Box, Button, Center, Text, VStack } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "../navigation/AppNavigator";

type ConfirmAppointmentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ConfirmAppointment"
>;

type ConfirmAppointmentScreenRouteProp = RouteProp<
  RootStackParamList,
  "ConfirmAppointment"
>;

type Props = {
  navigation: ConfirmAppointmentScreenNavigationProp;
  route: ConfirmAppointmentScreenRouteProp;
};

const ConfirmAppointmentScreen = ({ navigation, route }: Props) => {
  const consultationData = route.params?.consultationData;

  const handleBackToList = () => {
    // Navegar de volta para a lista de consultas
    navigation.reset({
      index: 0,
      routes: [{ name: 'ConsultationsList' }],
    });
  };



  return (
    <NativeBaseProvider>
      <Center flex={1} bg="white" p={4}>
        <Box bg="green.100" p={4} rounded="md" width="100%" maxWidth={400}>
          <VStack space={4} alignItems="center">
            <Text fontSize="xl" fontWeight="bold" color="green.600" textAlign="center">
              Recarga agendada com sucesso!
            </Text>
            
            {consultationData && (
              <VStack space={2} width="100%">

                <Text>
                  <Text bold>Fonte de Energia: </Text>
                  {consultationData.specialty}
                </Text>
                <Text>
                  <Text bold>Período: </Text>
                  {consultationData.doctor}
                </Text>
                <Text>
                  <Text bold>Data: </Text>
                  {consultationData.date}
                </Text>
              </VStack>
            )}

            <Button
              width="100%"
              onPress={handleBackToList}
              colorScheme="green"
            >
              Voltar para Lista de Consultas
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default ConfirmAppointmentScreen;
