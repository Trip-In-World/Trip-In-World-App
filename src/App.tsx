import React from 'react';
import { Text, View } from 'react-native';
import { store } from './stores/configureStore';
import { Provider } from 'react-redux';

export function App() {  
  return (
    <Provider store={store}>
      <View>
        <Text>안녕하세요!</Text>
      </View>
    </Provider>
  );
}

export { default } from '../.storybook';