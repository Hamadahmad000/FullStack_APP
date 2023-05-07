import {View, Text} from 'react-native';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import {StateProviderContext} from './src/context/stateProvider';

const App = () => {
  return (
    <StateProviderContext>
      <Navigation />
    </StateProviderContext>
  );
};

export default App;
