import { Button } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import PostScreen from './screens/PostScreen';
import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator(); 

const StackNavigator = () => {

    const { user } = useAuth();

  return (
    <Stack.Navigator>
        {user ? (
              <>
                  <Stack.Group>
                      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
                        <Stack.Screen name="Chat" component={ChatScreen} />
                  </Stack.Group>
                  <Stack.Group screenOptions={{ presentation: "modal"}}>
                      <Stack.Screen name="Onboarding" component={OnBoardingScreen} options={{ headerShown: false }} />
                      <Stack.Screen name="Post" component={PostScreen} options={{headerShown: false}} />
                  </Stack.Group>
            </>
        ) : (
            <>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
            </>
        )}

    </Stack.Navigator>
  )
}

export default StackNavigator