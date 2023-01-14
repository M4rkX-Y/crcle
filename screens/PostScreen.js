import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { uuidv4 } from '@firebase/util';


const PostScreen = () => {

    const [title, setTitle] = useState();
    const [message, setMessage] = useState();
    const navigation = useNavigation();
    const [mode, setMode] = useState(true);
    const [open1, setOpen1] = useState(false);

    const { user } = useAuth();
    
    const postid = uuidv4();

    const addpost = () => {
    setDoc(doc(db, "posts", postid), {
        id: postid,
        uid: user.uid,
        title: title,
        message: message,
        visability: mode,
        timestamp: serverTimestamp()
    }).then(() => { navigation.navigate("Chat") }).catch((error) => { alert(error.message) });
  };


  return (
      <SafeAreaView className="flex-1 bg-alabaster pt-5 pl-2 pr-2">
          <View className="pl-3 pr-5 mt-5 flex-row w-full h-10 justify-between items-center">
              <View className="w-12"> 
              </View>
              <Text className="text-3xl text-black-coral" >Share</Text>
              <TouchableOpacity onPress={addpost}>
                  <Text className="text-xl text-black-coral" >Post</Text>
              </TouchableOpacity>
          </View>
          <View className="mt-4 flex">
              <View className="ml-5 flex-row justify-between items-center h-16 mr-10">
                  <TouchableOpacity className="flex-row items-center" onPress={() => {setOpen1(true)}}>
                      <Text className="ml-3 text-xl text-black-coral">{ mode ? "Everyone" : "Connection Only" }</Text>
                      <View className="ml-2" >
                        <AntDesign name="down" size={15} color="white" />
                      </View>
                </TouchableOpacity>
              </View>
              <TextInput className="pl-5 pr-5 pt-3 text-xl " 
                placeholder='Share your thoughts...' 
                placeholderTextColor='white'
                style={{color: 'white'}}
                value={title} 
                textAlignVertical='top'
                  onChangeText={setTitle} />
              <View className="ml-4 mr-4 mt-5 h-0.5 bg-neutral-500"></View>
              <TextInput className="pl-5 pr-5 pt-5 text-lg " 
                placeholder='In detail...' 
                multiline
                numberOfLines={5}
                placeholderTextColor='white'
                style={{color: 'white'}}
                value={message} 
                textAlignVertical='top'
                onChangeText={setMessage} />
          </View>
          <Modal
              isVisible={open1}
              onSwipeComplete={() => setOpen1(false)}
              swipeDirection="down">
              <View className="absolute w-full rounded-xl bg-alabaster bottom-0 h-1/3">
                  <View className="ml-20 mr-20 mt-2 h-1 bg-space-cadet rounded"></View>
                  <View className="m-3 h-full">
                      <Text className="text-2xl text-black-coral" >Who can see your post?</Text>
                      <Text className="text-base text-black-coral">{mode ? "Your idea will be able to reach to everyone on the platform" : "Only your connections can see the idea in their feed"}</Text>
                      <TouchableOpacity className="mt-5" onPress={() => { setMode(true) }}>
                          <View className="ml-3 flex-row items-center">
                              <FontAwesome name="globe" size={24} color="grey" />
                          {mode ? <Text className="ml-4 text-xl text-mandarin">Everyone</Text>: <Text className="ml-4 text-xl text-white">Everyone</Text>}
                          </View>
                        </TouchableOpacity>
                      <TouchableOpacity className="mt-6" onPress={() => { setMode(false) }}>
                          <View className="ml-3 flex-row items-center">
                              <Ionicons name="people" size={24} color="grey" />
                            {mode ? <Text className="ml-3 text-xl text-white">Connections Only</Text>: <Text className="ml-3 text-xl text-mandarin">Connections Only</Text>}
                          </View>
                        </TouchableOpacity>
                </View>
            </View>
          </Modal>
    </SafeAreaView>
  )
}

export default PostScreen