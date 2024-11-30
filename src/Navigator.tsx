import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import BottomTabs from './BottomTabs';
import PostDetail from './PostDetail';
import PostsByTag from './PostsByTag';
import Tags from './Tags';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'BottomTabs'}>
        <Stack.Screen
          name={'BottomTabs'}
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={'PostDetail'} component={PostDetail} />
        <Stack.Screen
          name={'PostsByTag'}
          component={PostsByTag}
          options={({ route }: any) => ({
            title: route.params.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
