import { View, Text, Pressable, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

const OnBoardingScreen = () => {

  const { user } = useAuth();
  const [fname, setFName] = React.useState()
  const [lname, setLname] = React.useState()
  const [uni, setUni] = React.useState()
  const [url1, setURL1] = React.useState()
  const [bio, setBio] = React.useState("")
  const navigation = useNavigation();

  const incomplete = !fname || !lname || !uni || !url1

  const adduser = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      fname: fname,
      lname: lname,
      uni: uni,
      url1: url1,
      bio: bio,
      email: user.email,
      timestamp: serverTimestamp()
    }).then(() => { navigation.navigate("Home") }).catch((error) => { alert(error.message) });
  };
  
  return (
    <SafeAreaView className="flex-1 bg-neutral-900 pt-10">
      <Text className="pl-5 pt-10 text-7xl text-amber-300" >Welcome</Text>
      <Text className="pl-5 pt-2 text-xl text-neutral-300">Fill Out This Form to Get Started</Text>
      <TextInput className="pt-5 pl-5 pr-5 text-2xl" 
        placeholder='First Name'
        placeholderTextColor='white'
        style={{color: 'white'}}
        value={fname}
        onChangeText={setFName} />
      <TextInput className="pl-5 pt-5 pr-5 text-2xl " 
        placeholder='Last Name' 
        placeholderTextColor='white'
        style={{color: 'white'}}
        value={lname} 
        onChangeText={setLname} />
      <TextInput className="pl-5 pt-5 pr-5 text-2xl " 
        placeholder='University' 
        placeholderTextColor='white'
        style={{color: 'white'}}
        value={uni} 
        onChangeText={setUni} />
      <TextInput className="pl-5 pt-5 pr-5 text-2xl " 
        placeholder='LinkedIn URL' 
        placeholderTextColor='white'
        style={{color: 'white'}}
        value={url1} 
        onChangeText={setURL1} />
      <TextInput className="pl-5 pt-5 pr-5 text-2xl " 
        placeholder='More (optional)' 
        multiline
        numberOfLines={4}
        placeholderTextColor='white'
        style={{color: 'white'}}
        value={bio} 
        textAlignVertical='top'
        onChangeText={setBio} />
      <View className="justify-center flex-1 items-center">
        <TouchableOpacity disabled={incomplete} onPress={adduser}>
          <Text className={ incomplete ? "text-3xl text-neutral-700" : "text-3xl text-neutral-300"}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default OnBoardingScreen