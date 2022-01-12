import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
}from '@expo-google-fonts/poppins';
import theme from './src/global/styles/theme';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/hooks/Auth';

import { Routes }  from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_400Regular
  })
  if(!fontsLoaded){
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
      
        <StatusBar barStyle={'light-content'}/>
        <AuthProvider>
          <Routes />
        </AuthProvider>
     
    </ThemeProvider>
  );
}


