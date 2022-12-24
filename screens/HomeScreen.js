import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';




const HomeScreen = () => {

  const { user } = useAuth();
  const navigation = useNavigation();

  const check = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      navigation.navigate("Onboarding")
    }
  }

  check();

  return (
    <>
    <View className="flex-1 bg-alabaster">
        <Header/>
        <TouchableOpacity className="absolute bottom-12 right-6 items-center justify-center rounded-full w-20 h-20 bg-mandarin" >
          <AntDesign name="right" size={30} color="white" />
        </TouchableOpacity>
    </View>
    </>
  )
}

export default HomeScreen