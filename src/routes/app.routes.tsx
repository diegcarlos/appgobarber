import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();


 const AppRoutes: React.FC = () => {
   return(
      <App.Navigator
        headerMode="screen"
        screenOptions={{
          headerTitle: 'Test',
          headerShown: true,
          cardStyle: { backgroundColor:'#312e38' }
        }}
      >
        <App.Screen name="SignIn" component={Dashboard} />
      </App.Navigator>
   );
 };
export default AppRoutes;