import { View, Text, Animated, ScrollView } from 'react-native'
import React from 'react'

const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = 90;

const Header = () => {

  const scrollY = new Animated.Value(0);

  const _renderScrollViewContent = () => {
    const data = Array.from({length: 5});
    return (
      <View style={{ marginTop: HEADER_MAX_HEIGHT }}>
        {data.map((_, i) =>
          <View key={i} className="h-36 m-4 items-center justify-center bg-white rounded-xl">
            <Text>{i}</Text>
          </View>
        )}
      </View>
    );
  }

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
      <ScrollView
              className="flex-1"
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false}
              )}
            >
              {_renderScrollViewContent()}
            </ScrollView>
            <Animated.View style={{height: headerHeight}} className="absolute top-0 w-full rounded-b-xl bg-black-coral overflow-hidden">
                <Animated.Image
                className="absolute top-20 left-8 w-32 h-32 rounded-full"
                    style={{ opacity: imageOpacity, transform: [{translateY: imageTranslate}]}}
                    source={require("../images/pf_pic.jpg")}
                />
                <Animated.View className="absolute top-32 right-12" style={{ opacity: imageOpacity, transform: [{translateY: imageTranslate}]}}>
                    <Text className="text-white text-3xl" >User Name</Text>
                    <Text className="text-white text-xl" >Bio...</Text>
                </Animated.View>
                
              <Animated.View style={{
                  marginTop: 48,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                opacity: titleVisibility}} >
                <Text className="text-white text-2xl" >User Name</Text>
              </Animated.View>
            </Animated.View>
      </>
  )
}

export default Header