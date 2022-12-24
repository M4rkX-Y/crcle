import { View, Text, TextInput, TouchableOpacity, SafeAreaView,  ImageBackground } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import bg from '../images/bg_1.png'



const LoginScreen = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const login = () => {
    if (email !== "" && password !== "") {
      setDisable(true);
      signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          setErrorMessage(error.message)
          setDisable(false);
        });
    } else {
      setErrorMessage("Please enter an email and password");
    }
  }

  return (
    <View className="flex-1 bg-alabaster">
      <ImageBackground source={bg} resizeMode="cover">
        <View className="ml-8 h-1/5" />
        <View className="ml-8 h-1/3 justify-center">
        <Text className="text-4xl text-space-cadet" >Welcome</Text>
        <Text className="mt-0.5 text-4xl text-space-cadet" >Back</Text>
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
          onChangeText={setPassword} />
        <View className="bg-space-cadet h-0.5 mt-2" />
        <View className="mt-2 items-end">
            <TouchableOpacity>
              <Text className="text-base text-black-coral" >Forget Password</Text>
          </TouchableOpacity>
        </View>
        <View className="h-10">
          <Text className="mt-5 text-base text-shadow">{ errorMessage }</Text>
        </View>
      </View>
      <View className="flex-1 items-center m-8 pt-20">
          <TouchableOpacity className={disable ? ("h-12 w-full items-center justify-center rounded-xl bg-light-mandarin") : ("h-12 w-full items-center justify-center rounded-xl bg-mandarin")} onPress={login} disabled={disable}>
          <Text className="text-xl text-white" >Login in</Text>
        </TouchableOpacity>
      
        <TouchableOpacity className="mt-4 h-12 w-full items-center justify-center rounded-xl bg-white" onPress={() => navigation.navigate('Signup')}>
          <Text className="text-xl text-shadow" >Signup</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen