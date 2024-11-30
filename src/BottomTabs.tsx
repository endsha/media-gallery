import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import Settings from './Settings';
import Hot from './Hot';
import Tags from './Tags';
import Favorite from './Favorite';

const Tab = createBottomTabNavigator();

export default function BottomTabs(): JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator initialRouteName="Settings">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Hot" component={Hot} />
        <Tab.Screen name={'Tags'} component={Tags} />
        <Tab.Screen
          name={'Favorite'}
          component={Favorite}
          options={{ headerTitle: 'Favorite Pics' }}
        />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </View>
  );
}
