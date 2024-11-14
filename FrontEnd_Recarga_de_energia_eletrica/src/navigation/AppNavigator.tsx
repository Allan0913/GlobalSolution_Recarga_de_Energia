import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConsultationsListScreen from '../screens/ConsultationsListScreen';
import ScheduleConsultationScreen from '../screens/ScheduleConsultationScreen';
import ConfirmAppointmentScreen from '../screens/ConfirmAppointmentScreen';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ConsultationsList: undefined;
  ScheduleConsultation: undefined;
  ConfirmAppointment: {
    consultationData?: {
      date: string;
      doctor: string;
      specialty: string;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#137181',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ 
          headerShown: false // Remove o header na tela de login
        }} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ 
          title: 'Criar Conta',
          headerStyle: {
            backgroundColor: '#137181',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="ConsultationsList" 
        component={ConsultationsListScreen} 
        options={{ 
          title: 'Minhas Consultas',
          headerLeft: () => null, // Remove o botão de voltar
        }} 
      />
      <Stack.Screen 
        name="ScheduleConsultation" 
        component={ScheduleConsultationScreen} 
        options={{ 
          title: 'Agendar Consulta',
        }} 
      />
      <Stack.Screen 
        name="ConfirmAppointment" 
        component={ConfirmAppointmentScreen} 
        options={{ 
          title: 'Confirmação',
          headerLeft: () => null, // Remove o botão de voltar
        }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
