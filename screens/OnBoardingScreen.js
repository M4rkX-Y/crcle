import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useState } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import bg from '../images/bg_2.png'
import { AntDesign } from '@expo/vector-icons';

const OnBoardingScreen = () => {

  const { user } = useAuth();
  const [fname, setFName] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [uni, setUni] = useState("");
  const [location, setLocation] = useState("");
  const [job, setJob] = useState("");
  const [cname, setCname] = useState("");
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  const check_complete = () => {
    if (count === 4) {
      setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      fname: fname,
      lname: lname,
      age: age,
      uni: uni,
      location: location,
      job: job,
      cname: cname,
      email: user.email,
      timestamp: serverTimestamp()
    }).then(() => { navigation.navigate("Onboarding2") }).catch((error) => { alert(error.message) });
    } else {
      setCount((current) => current + 1)
    }
  }


  const data = [{
    title: "Let us know more about you",
    p1: "First Name (Required)",
    q1: fname,
    q1f: setFName,
    p2: "Last Name",
    q2: lname,
    q2f: setLname,
  }, {
    title: "What's your Gender Pronouns",
    p1: "Gender",
    q1: age,
    q1f: setAge,
  }, {
    title: "Where do you live",
    p1: "Location (City, State)",
    q1: location,
    q1f: setLocation,
    }, {
    title: "Education background",
    p1: "University",
    q1: uni,
    q1f: setUni,
  }, {
    title: "Current working position",
    p1: "Job Title",
    q1: job,
    q1f: setJob,
    p2: "Company Name (Optional)",
    q2: cname,
    q2f: setCname,
  },]
  

  return (
    <View className="flex-1 bg-alabaster">
      <ImageBackground source={bg} resizeMode="cover">
        <View className="h-full">

              <View className="ml-8 mr-8 h-1/3 justify-end">
                <Text className="text-4xl text-space-cadet" >{data[count].title}</Text>
                </View>
              <View className="ml-8 mr-8 mt-5 pt-8 pr-10 h-1/3">
                  {data[count].q1f != null ? (
                    <>
                    <TextInput className="text-xl"
                      placeholder={data[count].p1}
                      value={data[count].q1}
                      onChangeText={data[count].q1f} />
                      <View className="bg-space-cadet h-0.5 mt-2" />
                    </>
                  ) : (<></>)}
                  {data[count].q2f != null ? (
                  <>
                    <TextInput className="mt-5 text-xl"
                      placeholder={data[count].p2} 
                      value={data[count].q2}
                      onChangeText={data[count].q2f} />
                      <View className="bg-space-cadet h-0.5 mt-2" />
                  </>
                ) : (<></>)}
                  </View>
          <TouchableOpacity disabled={!data[count].q1} className={!data[count].q1 ? "absolute bottom-24 right-10 items-center justify-center rounded-full w-20 h-20 bg-light-mandarin" : "absolute bottom-24 right-10 items-center justify-center rounded-full w-20 h-20 bg-mandarin"} onPress={() => { check_complete() }} >
            <AntDesign name="right" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

export default OnBoardingScreen