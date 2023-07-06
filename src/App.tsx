import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { store } from './stores/configureStore';
import { Provider } from 'react-redux';

export function App() {
  useEffect();
  
  return (
    <Provider store={store}>
      <View>
        <Text>안녕하세요!</Text>
      </View>
    </Provider>
  );
}

export { default } from '../.storybook';