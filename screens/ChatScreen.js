import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ChatHeader from '../components/ChatHeader'
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => { 

  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-alabaster">
      <ChatHeader title="Comments" />
      <View className="items-center">
        <TouchableOpacity onPress={() => navigation.navigate("Post")}>
          <Text>Add Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChatScreen