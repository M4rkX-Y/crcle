import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import { useState } from 'react'
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import bg from "../images/bg_1.png"
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [disable, setDisable] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState()
    const [validationMessage, setValidationMessage] = useState("");
    const navigation = useNavigation()

  const signUp = () => {
    if (password === confirmPassword) {
          setDisable(true)
          createUserWithEmailAndPassword(auth, email, password)
          .catch((error) => {
            setValidationMessage(error.message);
            setDisable(false);
          });
      }
    } 

  const validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else {
      setValidationMessage("");
    }

    setValue(value);
  };



  return (
    <View className="flex-1 bg-alabaster">
      <ImageBackground source={bg} resizeMode="cover">
        <View className="ml-8 h-1/5" />
      <View className="ml-8 h-1/3 justify-center">
        <Text className="text-4xl text-space-cadet" >Create</Text>
        <Text className="mt-0.5 text-4xl text-space-cadet" >Account</Text>
      </View>
      <View className="pl-8 pr-8 justify-center flex-column">
        <TextInput className="text-xl"
        placeholder='Email' 
        value={email}
          onChangeText={setEmail} />
        <View className="bg-space-cadet h-0.5 mt-2"/>
      <TextInput className="mt-5 text-xl"
        placeholder='Password' 
        value={password}
       secureTextEntry={true} 
          onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} />
        <View className="bg-space-cadet h-0.5 mt-2"/>
      
      <TextInput className="mt-5 text-xl"
        placeholder='Comfirm Password' 
        value={confirmPassword}
        secureTextEntry={true} 
          onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
        <View className="bg-space-cadet h-0.5 mt-2" />
        <View className="h-10">
            <Text className="mt-5 text-base text-shadow">{validationMessage}</Text>
        </View>
      </View>
      <View className="flex-1 items-center m-8 pt-10">
        <TouchableOpacity className={disable ? ("h-12 w-full items-center justify-center rounded-xl bg-light-mandarin") : ("h-12 w-full items-center justify-center rounded-xl bg-mandarin")} onPress={signUp} disabled={disable}>
          <Text className="text-xl text-platinum" >Signup</Text>
        </TouchableOpacity>
      
        <TouchableOpacity className="mt-4 h-12 w-full items-center justify-center rounded-xl bg-white" onPress={() => navigation.pop()}>
          <Text className="text-xl text-shadow" >Return</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

export default SignupScreen