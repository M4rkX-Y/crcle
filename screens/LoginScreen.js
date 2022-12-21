import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";



const LoginScreen = () => {
  let [errorMessage, setErrorMessage] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  const navigation = useNavigation();

  let login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setErrorMessage(error.message)
        });
    } else {
      setErrorMessage("Please enter an email and password");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 pt-10">
      <Text className="pl-5 pt-10 text-7xl text-amber-300 underline" >Login</Text>
      <TextInput className="pt-3 pl-5 pr-5 text-3xl" 
        placeholder='Email' 
        placeholderTextColor='white'
        style={{color: 'white'}}
        value={email}
        onChangeText={setEmail} />
      <TextInput className="pl-5 pt-2 pr-5 text-3xl text-neutral-300" 
        placeholder='Password' 
        placeholderTextColor='white'
        style={{color: 'white'}}
        value={password}
        secureTextEntry={true} 
        onChangeText={setPassword} />
      <Text className="pt-10 pl-5 pr-5 text-xl text-neutral-300">{errorMessage}</Text>
      <View className="pt-24 justify-center flex-1 items-center">
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text className="text-3xl text-neutral-300" >Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity className="pt-5" onPress={login}>
          <Text className="text-3xl text-amber-300" >Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen