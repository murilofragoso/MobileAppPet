import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home';
import Register from './pages/Register';
import Chat from './pages/Chat';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none" 
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#f0f0f5'
                    }
                }}
            >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="Chat" component={Chat} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;