import Animated, { FadeIn } from "react-native-reanimated";
import { Dimensions, StatusBar, View } from "react-native";
import { MainWrapper } from "../Layout/MainWrapper";
import { useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import FastImage from "react-native-fast-image";
import { GetHomePage } from "../LocalStorage/AppSettings";

// InitialScreen component with navigation prop
// This component is used for the initial screen of the app
// It sets up the splash screen and navigates to the appropriate screen based on user settings
export const InitialScreen = ({ navigation }) => {
  // useTheme hook to access theme colors
  const theme = useTheme();
  // get window dimensions
  const { width, height } = Dimensions.get("window");

  // InitialCall function to determine the initial screen to navigate to
  async function InitialCall() {
    // GetHomePage function from AppSettings to get the user's home page preference
    const screen = await GetHomePage();
    // Navigate to MainRoute if the home page is Anime
    if (screen === "Anime") {
      navigation.replace("MainRoute");
    }
    // Navigate to MainRouteWithManga if the home page is Manga
    else {
      navigation.replace("MainRouteWithManga");
    }
  }

  // useEffect hook to call InitialCall after a delay
  useEffect(() => {
    setTimeout(() => {
      InitialCall();
    }, 820);
  }, []);

  // MainWrapper component for the overall layout
  return (
    <MainWrapper>
      {/* StatusBar component for the app status bar */}
      <StatusBar translucent={true} />
      {/* View component for the overall layout */}
      <View
        style={{
          // flex: 1 for full-screen layout
          flex: 1,
          // center align items
          alignItems: "center",
          // center justify content
          justifyContent: "center",
        }}
      >
        {/* FastImage component for the splash screen image */}
        <FastImage
          source={require("../assets/AppImages/splash.gif")}
          // set the height and width to match the window dimensions
          style={{
            height: height,
            width: width,
          }}
          // set the resize mode to stretch
          resizeMode={FastImage.resizeMode.stretch}
        />
        {/* View component for the overlay text */}
        <View
          style={{
            // position the overlay text absolutely
            position: "absolute",
            // set the width and height to match the window dimensions
            width: width,
            height: height,
            // center align items
            alignItems: "center",
            // center justify content
            justifyContent: "center",
            // set the background color
            backgroundColor: "rgba(0,0,0,0.86)",
          }}
        >
          {/* Animated.Text component for the app name */}
          <Animated.Text
            entering={FadeIn.delay(100).duration(300)}
            style={{
              // set the font size
              fontSize: 30,
              // set the text color
              color: "white",
              // set the font weight
              fontWeight: 500,
            }}
          >
            Nekoflix
          </Animated.Text>
          {/* Animated.Text component for the app tagline */}
          <Animated.Text
            entering={FadeIn.delay(300)}
            style={{
              // set the font size
              fontSize: 15,
              // set the text color to the primary color from the theme
              color: theme.colors.primary,
            }}
          >
            One app you need
          </Animated.Text>
        </View>
      </View>
    </MainWrapper>
  );
};
