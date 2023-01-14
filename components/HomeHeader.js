import { View, Text, Animated, ScrollView, ActivityIndicator } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import HomePost from './HomePost';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = 90;

const HomeHeader = ({ data }) => {
  

  const scrollY = new Animated.Value(0);


  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });
  const titleVisibility = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE - 5, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
    
    
  return (
    <>
      {data ? (
            <>
      <ScrollView
              className="flex-1"
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false}
              )}
            >
              <View style={{ marginTop: HEADER_MAX_HEIGHT + 10 }}>
                <View className="ml-4 mr-4 mt-2 mb-2 flex-column bg-white rounded-xl">
                  <View className="h-12 pl-6 pt-3">
                    <Text className="text-base" >Interests Placeholder</Text>
                </View>
              <View className="bg-alabaster h-0.5 ml-4 mr-4" />
              <View className="h-12 pl-6 flex-row items-center">
                  <Ionicons name="location-sharp" size={20} color="#EF8354" />
                    <Text className="text-base ml-3">{data.location}</Text>
                </View>
              <View className="bg-alabaster h-0.5 ml-4 mr-4" />
              <View className="h-12 pl-6 flex-row items-center">
                <MaterialIcons name="work" size={20} color="#EF8354" />
                  <Text className="text-base ml-3">{data.job}</Text>
                  <Text className="text-base">{data.cname ? "at"+data.cname : ""}</Text>
                </View>
              <View className="bg-alabaster h-0.5 ml-4 mr-4" />
              <View className="h-12 pl-6 mb-1 flex-row items-center">
                <FontAwesome5 name="graduation-cap" size={18} color="#EF8354"/>
                      <Text className="text-base ml-2.5">{data.uni}</Text>
                  </View>
              </View>
              <HomePost data={data} />

              </View>
            </ScrollView>
          <Animated.View style={{ height: headerHeight }} className="absolute top-0 w-full rounded-b-xl bg-black-coral overflow-hidden">
                <Animated.View className="absolute w-full top-14 pl-8 flex-row items-center" style={{ opacity: imageOpacity, transform: [{translateY: imageTranslate}]}}>
                    <Animated.Image
                className="w-32 h-32 rounded-full"
                    style={{ opacity: imageOpacity, transform: [{translateY: imageTranslate}]}}
                    source={require("../images/pf_pic.jpg")}
            />
                <View className="flex-column ml-12">
                        <Text className="text-white text-3xl" >{data.fname + " " + data.lname}</Text>
                        <Text className="text-white text-xl" >Bio...</Text>
                </View>
                </Animated.View>
                
              <Animated.View style={{
                  marginTop: 48,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                opacity: titleVisibility}} >
            <Text className="text-white text-2xl" >{ data.fname + " " + data.lname }</Text>
              </Animated.View>
            </Animated.View>
      </>
      ) : (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#EF8354" />
            <Text className="mt-3 text-xl">No more profiles</Text>
          </View>
      )}
    </>
  )
}

export default HomeHeader