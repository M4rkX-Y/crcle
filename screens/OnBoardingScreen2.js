import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import bg from '../images/bg_2.png'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const OnBoardingScreen2 = () => {

  const navigation = useNavigation();

    const _renderContent = () => {
        const data = [
            "field1",
            "field2",
            "field3",
            "field4",
            "field5",
            "field6",
            "field7",
            "field8",
            "field9",
        ]
        return (
        <View className="flex-row flex-wrap h-1/3 p-8">
            {data.map((items) =>
            <TouchableOpacity key={items} className="mr-2 mb-2 p-2 rounded-lg bg-white items-center justify-center" onPress={()=> console.log(items)}>
                <Text className="text-base">{items}</Text>
            </TouchableOpacity>
            )}
        </View>
        );
    }
    

  return (
    <View className="flex-1 bg-alabaster">
      <ImageBackground source={bg} resizeMode="cover">
        <View className="h-full">
            <View className="ml-8 mr-8 h-1/3 justify-end">
                <Text className="text-4xl text-space-cadet" >What are your interested fields</Text>
            </View>    
            
                {_renderContent()}
            
                  
              </View>
            <TouchableOpacity className="absolute bottom-24 right-10 items-center justify-center rounded-full w-20 h-20 bg-mandarin" onPress={() => navigation.navigate("Home")}>
            <AntDesign name="right" size={30} color="white" />
          </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default OnBoardingScreen2