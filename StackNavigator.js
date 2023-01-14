import { View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PostScreen from './screens/PostScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import OnBoardingScreen2 from './screens/OnBoardingScreen2';
import useAuth from './hooks/useAuth';
import { Ionicons, Entypo } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator(); 


const StackNavigator = () => {

    const { user, logout } = useAuth();
    function NavBar( {navigation} ) {
        return (
            <View className="flex-row justify-between h-24 bg-space-cadet w-full">
            <View className="ml-10 mr-10 absolute flex-row inset-x-0 bottom-5 justify-between h-20">
                <TouchableOpacity className="pt-6" onPress={() => {navigation.navigate("Home")}}>
                    <Entypo name="home" size={24} color="#E6E6E6"/>
                </TouchableOpacity>
                <TouchableOpacity className="pt-6" onPress={() => {navigation.navigate("Chat")}}>
                    <Entypo name="message" size={24} color="#E6E6E6" />
                </TouchableOpacity>
                <TouchableOpacity className="pt-6">
                    <Ionicons name="people" size={24} color="#E6E6E6" />
                </TouchableOpacity>
                <TouchableOpacity className="pt-6" onPress={logout}>
                    <Ionicons name="person" size={24} color="#E6E6E6" />
                </TouchableOpacity>
            </View>
            </View>
        )
    }

    function Main() {
        return (
            <Tab.Navigator
                initialRouteName={"Home"}
                tabBar={(props) => <NavBar {...props} />}>
                <Tab.Group screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Chat" component={ChatScreen} />
                </Tab.Group>
            </Tab.Navigator>
        )
    }

    return (
        <Stack.Navigator>
            {user ? (
                <Stack.Group screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Main" component={Main} />
                    <Stack.Screen name="Post" component={PostScreen} />
                    <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
                    <Stack.Screen name="Onboarding2" component={OnBoardingScreen2} />
                </Stack.Group>
                
            ) : (
                
                <Stack.Group screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Signup" component={SignupScreen}/>
                </Stack.Group>
                
            )}
        </Stack.Navigator>  
    )
}

export default StackNavigator