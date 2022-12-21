import { View, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import Swiper from 'react-native-deck-swiper';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import NavBar from '../components/NavBar'
import { onSnapshot, doc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const HomeScreen = () => {

  const { user } = useAuth();
  const swipeRef = useRef(null);
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]); 

  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), snapshot => {
      if (!snapshot.exists()) {
        navigation.navigate("Onboarding");
      }
    });
    return unsub();
  }, [])

  useEffect(() => {
    let unsub;

    const fetchPosts = async () => {
      unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      })
    }

    fetchPosts();
    return unsub;
  }, []);



  console.log(posts)

  return (
    <View className="flex-1 bg-neutral-900 pt-10">
      <View className="flex-1 -mt-10">
        <Swiper
            ref={swipeRef}
            cards={posts}
            renderCard={(card) => card ? (
                  <View className="relative rounded-xl h-5/6 bg-neutral-700">
                <View className="absolute h-5/6 w-full">
                      <Text className="m-5 text-amber-300 text-4xl ">{card.type}</Text>
                      <View className="ml-5 mb-3">
                          <Text className="text-neutral-300 text-2xl">{card.title}</Text>
                        </View>
                        <ScrollView className="ml-5 mr-5">
                        <TouchableWithoutFeedback>
                          <View>
                            <Text className="text-neutral-400 text-base">{card.message}</Text>
                          </View>
                          </TouchableWithoutFeedback>
                      </ScrollView>
                      <View className="m-5">
                        <Image className="rounded w-full" source={require("../assets/download.jpeg")}/>
                      </View>
                    </View>
                    <View className="absolute flex-column bottom-0 left-0 w-auto h-32">
                      <Text className="ml-5 mt-5 text-neutral-300 text-base">Created By</Text>
                      <View className="ml-5 mt-2 justify-center flex-row">
                        <Image className="rounded-full w-12 h-12" source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                        <View className="flex pl-3">
                          <Text className="text-neutral-300 text-xl">Name*</Text>
                          <Text className="text-neutral-300 text-xs">Date*</Text>
                        </View>
                      </View>
                    </View>
                  </View>
            ) : (
                <View className="relative rounded-xl h-5/6 bg-neutral-700 items-center justify-center"> 
                  </View>
                )
            }
            onSwipedAll={() => {console.log('onSwipedAll')}}
            onSwipedLeft={() => {console.log('Pass')}}
            onSwipedRight={() => {console.log("Spark")}}
            cardIndex={0}
            verticalSwipe={false}
            backgroundColor={'transparent'}
            stackSize= {5}>
        </Swiper>
      </View>
      <View className="flex flex-row justify-evenly h-20">
            <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-neutral-300" onPress={() => {swipeRef.current.swipeLeft()}}>
              <Octicons name="skip" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-amber-300" onPress={() => {swipeRef.current.swipeRight()}}>
              <MaterialCommunityIcons name="lightning-bolt" size={28} color="white" />
            </TouchableOpacity>
      </View>
      <NavBar/>
    </View>
  )
}

export default HomeScreen