import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChatHeader = ({ title }) => {

    const navigation = useNavigation();
  return (
      <View className="flex-row items-center p-2 justify-between bg-white pt-12 h-24">
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="#EF8354" />
          </TouchableOpacity>
          <Text className="text-2xl text-space-cadet">{title}</Text>
          <View className="w-5"></View>
    </View>
  )
}

export default ChatHeader