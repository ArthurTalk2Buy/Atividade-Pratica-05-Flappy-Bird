import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Tela1 from './src/telas/tela1';
import Tela2 from './src/telas/tela2';
import Tela3 from './src/telas/tela3';
import Tela4 from './src/telas/tela4';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="BoasVindas" component={Tela1} />
          <Stack.Screen name="Instrucoes" component={Tela2} />
          <Stack.Screen name="Jogo" component={Tela3} />
          <Stack.Screen name="Creditos" component={Tela4} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
