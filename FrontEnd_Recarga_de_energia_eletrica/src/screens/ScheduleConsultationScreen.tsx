import React, { useState, useMemo } from "react";
import {
  NativeBaseProvider,
  Button,
  Center,
  Select,
  FormControl,
  VStack,
  ScrollView,
  Text,
  Icon,
  Pressable,
  Box,
  Modal,
} from "native-base";
import { Alert, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from 'react-native-calendars';
import { MaterialIcons } from "@expo/vector-icons";
import { getUserData, createConsultation } from '../api/consultations';
import axios from "axios";

type ScheduleConsultationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ScheduleConsultation"
>;

type Props = {
  navigation: ScheduleConsultationScreenNavigationProp;
};

interface ConsultationData {
  userId: number;
  date: string;
  doctor: string;
  specialty: string;
  status: string;
}

const ScheduleConsultationScreen = ({ navigation }: Props) => {
  const [doctor, setDoctor] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const specialties = [
    "Elétrica",
    "Solar",
    "Eólica",
    "Hidrelétrica",

  ];

  const doctors = {
    Elétrica: ["Dia", "Tarde", "Noite (Prioridade)"],
    Solar: ["Dia", "Tarde", "Noite (Prioridade)"],
    Eólica: ["Dia", "Tarde", "Noite (Prioridade)"],
    Hidrelétrica: ["Dia", "Tarde", "Noite (Prioridade)"],
  };

  const minDate = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }, []);

  const maxDate = useMemo(() => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    return maxDate;
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCalendarDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getMarkedDates = () => {
    const marked: any = {};
    const current = formatCalendarDate(date);
    marked[current] = { selected: true, selectedColor: '#137181' };
    return marked;
  };

  const handleDateSelect = (day: any) => {
    const selectedDate = new Date(day.dateString);
    if (selectedDate >= minDate && selectedDate <= maxDate) {
      setDate(selectedDate);
      setShowCalendar(false);
    } else {
      Alert.alert(
        "Data inválida",
        "Por favor, selecione uma data entre hoje e os próximos 60 dias."
      );
    }
  };

  
  


  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!specialty || !doctor || !date) {
        Alert.alert("Erro", "Por favor, preencha todos os campos");
        return;
      }

      const username = await AsyncStorage.getItem("username");
      if (!username) {
        Alert.alert("Erro", "Usuário não autenticado");
        navigation.navigate("Login");
        return;
      }

      const userData = await getUserData(username);

      const consultationData = {
        userId: userData.id,
        date: date.toISOString(),
        doctor,
        specialty,
        status: "Carregando...",
      };

      await createConsultation(consultationData);
      
      navigation.navigate("ConfirmAppointment", {
        consultationData: {
          date: date.toLocaleDateString(),
          doctor,
          specialty
        }
      });
    } catch (error) {
      console.error('Erro detalhado:', error);
      Alert.alert(
        "Erro",
        error instanceof Error ? error.message : "Ocorreu um erro ao agendar a consulta. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center flex={1} bg="white" px={4} py={6}>
          <VStack space={4} width="100%">
            <FormControl isRequired>
              <FormControl.Label>Fontes de Energia</FormControl.Label>
              <Select
                placeholder="Selecione uma Fonte de Energia"
                selectedValue={specialty}
                onValueChange={(value) => {
                  setSpecialty(value);
                  setDoctor("");
                }}
                bg="white"
                borderColor="#137181"
                _selectedItem={{
                  bg: "cyan.100",
                }}
                size="lg"
                borderRadius="lg"
              >
                {specialties.map((spec) => (
                  <Select.Item key={spec} label={spec} value={spec} />
                ))}
              </Select>
              <FormControl.HelperText >
              <Text textAlign="justify" color="red.500" fontSize="12px">
    AVISO! Prioridade na energia solar e eólica e elétrica, por ser de uma fonte de energia renovável e não prejudicial ao planeta Terra.
  </Text>
              </FormControl.HelperText>
            </FormControl>

            <FormControl isRequired isDisabled={!specialty}>
              <FormControl.Label>Período do dia</FormControl.Label>
              <Select
                placeholder="Selecione o Período do dia"
                selectedValue={doctor}
                onValueChange={setDoctor}
                bg="white"
                borderColor="#137181"
                _selectedItem={{
                  bg: "cyan.100",
                }}
                size="lg"
                borderRadius="lg"
              >
                {specialty &&
                  doctors[specialty as keyof typeof doctors].map((doc) => (
                    <Select.Item key={doc} label={doc} value={doc} />
                  ))}
              </Select>
              <FormControl.HelperText>
                <Text textAlign="justify" color="red.500" fontSize="12px">
                AVISO! Prioridade no período da noite, por ser um periodo de menor demanda.
                </Text>
              </FormControl.HelperText>
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>Data do agendamento</FormControl.Label>
              <Pressable onPress={() => setShowCalendar(true)}>
                <Box
                  borderWidth={1}
                  borderColor="#137181"
                  borderRadius="lg"
                  p={4}
                  bg="white"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text color="#137181" fontSize="md">
                    {formatDate(date)}
                  </Text>
                  <Icon
                    as={<MaterialIcons name="calendar-today" />}
                    size={6}
                    color="#137181"
                  />
                </Box>
              </Pressable>
              <FormControl.HelperText>
                <Text textAlign="justify" color="coolGray.400" fontSize="12px">
                Selecione uma data para marcar o seu agendamento da recarga do seu veículo.
                </Text>

              </FormControl.HelperText>
            </FormControl>

            <Modal isOpen={showCalendar} onClose={() => setShowCalendar(false)} size="lg">
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Selecione uma Data</Modal.Header>
                <Modal.Body>
                  <Calendar
                    current={formatCalendarDate(date)}
                    minDate={formatCalendarDate(minDate)}
                    maxDate={formatCalendarDate(maxDate)}
                    onDayPress={handleDateSelect}
                    markedDates={getMarkedDates()}
                    theme={{
                      todayTextColor: '#137181',
                      selectedDayBackgroundColor: '#137181',
                      selectedDayTextColor: '#ffffff',
                      textDayFontSize: 16,
                      textMonthFontSize: 16,
                      textDayHeaderFontSize: 14,
                      arrowColor: '#137181',
                    }}
                  />
                </Modal.Body>
              </Modal.Content>
            </Modal>

            <Button
              onPress={handleSubmit}
              isLoading={loading}
              isLoadingText="Agendando..."
              mt={4}
              bg="success.500"
              _hover={{backgroundColor: "success.600"}}
              _pressed={{ bg: "success.600" }}
              size="lg"
              borderRadius="lg"
              leftIcon={<Icon as={<MaterialIcons name="check" />} size="sm" />}
            >
              Agendar Consulta
            </Button>
          </VStack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default ScheduleConsultationScreen;
