import { memo, useEffect, useRef, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import VideoPlayer from "react-native-video-controls";
import { useOrientation } from "../../../CustomHook/CheckOrentation"; // Custom hook to check the device orientation
import { lockToLandscape, lockToPortrait, unlockAllOrientations } from "react-native-orientation-manager";

// Memoized Player component
export const Player = memo(function Player({url, navigation, number}){
  // Video player ref
  const videoRef = useRef(null);
  // Screen dimensions
  const {width, height} = Dimensions.get("window")
  // State to keep track of fullscreen mode
  const [isFullScreen, setIsFullScreen] = useState(false);
  // Current device orientation
  const value = useOrientation()

  // Style definitions
  const styles = StyleSheet.create({
    backgroundVideo: {
      height:width * 0.75, // Video player height for portrait mode
      width:width,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    mainContainer:{ // Container style for portrait mode
      height:width * 0.75,
      borderBottomWidth:2,
      borderBottomColor:"rgb(26,26,26)",
    },
    buffering:{ // Loading indicator style
      flex:1,
      position:"absolute",
      height:30,
      width:30,
      zIndex:100,
    },
  });

  // Fullscreen style definitions
  const fullScreenStyle = StyleSheet.create({
    mainContainer:{ // Container style for landscape mode
        // transform: [{ rotate: '90deg'}],
        height:height,
        width:width,
        borderBottomWidth:2,
        borderBottomColor:"rgb(26,26,26)",
        zIndex:100,
    },
    backgroundVideo: { // Video player style for landscape mode
      height:height ,
      width:width,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  })

  // Effect to update fullscreen state based on device orientation
  useEffect(() => {
    if (value === "PORTRAIT") {
      setIsFullScreen(false)
    } else {
      setIsFullScreen(true)
    }
  }, [value]);

  // Cleanup function to reset orientation and show status bar
  useEffect(()=>{
    return ()=>{
      unlockAllOrientations()
      StatusBar.setHidden(false)
    }
  },[])

  // Effect to hide/show status bar based on fullscreen state
  useEffect(() => {
    if (isFullScreen){
      StatusBar.setHidden(true)
    } else {
      StatusBar.setHidden(false)
    }
  }, [isFullScreen]);

  // Render the video player in fullscreen or portrait mode
  return  <View style={isFullScreen ? fullScreenStyle.mainContainer : styles.mainContainer}>
    <VideoPlayer
      onEnterFullscreen={()=>{
        lockToLandscape()
      }}
      onExitFullscreen={()=>{
        lockToPortrait()
        unlockAllOrientations()
      }}
      navigator={navigation}
      disableFocus={true}
      toggleResizeModeOnFullscreen={false}
      seekColor={"red"}
      paused={false}
      source={{uri:url}}
      ref={videoRef}
      onError={()=>{}}
      style={isFullScreen ? fullScreenStyle.backgroundVideo : styles.backgroundVideo}
      showHours={true}
      title={ 'Episode ' + number }
      resizeMode={"contain"}
    />
  </View>
});
