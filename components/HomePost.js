import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import Modal from "react-native-modal";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import useAuth from '../hooks/useAuth';
import { db } from '../firebaseConfig';


const HomePost = ({ data }) => {

  

  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [posts, setPosts] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {

    let unsub;
    
    const fetchData = async () => {
      unsub =  await getDocs(query(collection(db, "posts"), where("uid", "==", user.uid)));
      setPosts(unsub.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })));
    }
    fetchData();
    return unsub;
  }, []);


  console.log(data.id);
  console.log(posts);

  const fposts = [{title: "test1"}, {title: "test2"}, {title: "test3"}]

    return (
      <>
        {fposts.map((item, i) => {
          <View key={i}>
            <TouchableOpacity onLongPress={() => setOpen(true)}>
              <View className="h-48 ml-4 mr-4 mt-2 mb-2 flex-column bg-white rounded-xl justify-center items-center ">
                <Text>{ item.title }</Text>
              </View>
            </TouchableOpacity>
          </View>
        })}

         <Modal
              isVisible={open}
              onSwipeComplete={() => setOpen(false)}
          swipeDirection="down">
          <View className="flex-1 mt-10 ml-2 mr-2 justify-center items-center rounded-xl bg-white">
            <Text>Content</Text>
          </View>
          <View className="flex-row mt-4 mb-24 ml-2 mr-2 justify-between">
            <View className="rounded-2xl bg-white h-16 w-4/5 justify-center pl-4">
              <TextInput className="text-lg"
              placeholder='Message' 
              value={message}
              onChangeText={setMessage} />
            </View>
            <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-mandarin" onPress={() => setOpen(false)}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
          </Modal>
      </>
    
  )
}

export default HomePost