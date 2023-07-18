import React from 'react';
import { store } from './stores/configureStore';
import { Provider } from 'react-redux';
import Navigation from './navigation';

export function App() {  
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}

export { default } from '../.storybook';