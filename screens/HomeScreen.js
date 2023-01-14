import { View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react'
import { onSnapshot, collection, query } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import HomeHeader from '../components/HomeHeader';
import { AntDesign } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';




const HomeScreen = () => {

  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  const check = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      navigation.navigate("Onboarding")
    }
  }

  check();
   

  useEffect(() => {
    let unsub;

    const fetchData = async () => {
      unsub = onSnapshot(collection(db, "users"), (snapshot) => {
        setData(
          snapshot.docs.filter((doc) => doc.id !== user.uid).map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      })
    }

    fetchData();
    return unsub;
  }, []);


  return (
        <>
        <View className="flex-1 bg-alabaster">
            <HomeHeader data={data[count]} />
            <TouchableOpacity className="absolute bottom-12 right-6 items-center justify-center rounded-full w-20 h-20 bg-mandarin" onPress={() => { setCount((current) => current + 1) }}>
              <AntDesign name="right" size={30} color="white" />
            </TouchableOpacity>
        </View>
        </>
  )
}

export default HomeScreen