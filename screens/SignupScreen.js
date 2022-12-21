import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupScreen = () => {

    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [confirmPassword, setConfirmPassword] = React.useState()
    const [validationMessage, setValidationMessage] = React.useState("");
    const navigation = useNavigation();

    let signUp = () => {
        if (password === confirmPassword) {
          createUserWithEmailAndPassword(auth, email, password)
          .catch((error) => {
            setValidationMessage(error.message);
          });
        }
      } 

  let validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else {
      setValidationMessage("");
    }

    setValue(value);
  };



  return (
    <SafeAreaView className="flex-1 bg-neutral-900 pt-10 pl-2">
      <Text className="pl-5 pt-10 text-7xl text-amber-300 underline" >Signup</Text>
      <TextInput className="pt-3 pl-5 pr-5 text-3xl" 
        placeholder='Email'
        placeholderTextColor='white'
        style={{color: 'white'}}
        value={email}
        onChangeText={setEmail} />
      <TextInput className="pl-5 pt-2 pr-5 text-3xl " 
        placeholder='Password' 
        placeholderTextColor='white'
        style={{color: 'white'}}
        value={password}
      secureTextEntry={true} 
      onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} />
      <TextInput className="pl-5 pt-2 pr-5 text-3xl " 
        placeholder='Comfirm Password' 
        placeholderTextColor='white'
        style={{color: 'white'}}
      value={confirmPassword}
      secureTextEntry={true} 
      onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
      <Text className="pt-10 pl-5 text-xl pr-5 text-neutral-300">{validationMessage}</Text>
      <View className="justify-center flex-1 items-center">
        <TouchableOpacity onPress={() => navigation.popToTop()}>
            <Text className="text-3xl text-neutral-300" >Return</Text>
        </TouchableOpacity>
        <TouchableOpacity className="pt-5" onPress={signUp}>
            <Text className="text-3xl  text-amber-300" >Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SignupScreen