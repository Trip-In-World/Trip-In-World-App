import React from 'react';
import { Text, View } from 'react-native';
import { store } from './common/store/configureStore';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <View>
        <Text>안녕하세요!</Text>
      </View>
    </Provider>
  );
}

export default App;