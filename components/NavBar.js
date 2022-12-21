import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {

  const { user, logout } = useAuth();
  const navigation = useNavigation();
    
  return (
    <View className="flex-row inset-x-0 bottom-0 justify-between h-20 bg-neutral-700">
        <Text className="pt-6 px-5 text-neutral-300">Explore</Text>
        <Text className="pt-6 px-5 text-neutral-300">Search</Text>
        <TouchableOpacity className="pt-3" onPress={() => {navigation.navigate("Post")}}>
            <Octicons name="diff-added" size={24} color="white" />
        </TouchableOpacity>
        <Text className="pt-6 px-5 text-neutral-300">Connect</Text>
        <TouchableOpacity onPress={logout}>
          <Text className="pt-6 px-5 text-neutral-300">Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

export default NavBar