import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeRoute } from "./Anime/HomeRoute";
import { LibraryRoute } from "./Library/LibraryRoute";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { MangaRoute } from "./Manga/MangaRoute";
import Entypo from "react-native-vector-icons/Entypo";

// Create a new bottom tab navigator
const Tab = createBottomTabNavigator();

// Define the root route for the application
export const RootRoute = () => {
  const theme = useTheme(); // Get the current theme from the navigation context
  const width = Dimensions.get("window").width; // Get the window width to calculate text size

  // Create a StyleSheet for the custom styles
  const style = StyleSheet.create({
    text: {
      color: theme.colors.primary, // Set the text color to the primary color of the theme
      fontSize: width * 0.02, // Set the font size relative to the window width
      textAlign: "center",
    },
    tabIconContainer: {
      alignItems: "center",
      justifyContent: "center",
      minWidth: 100, // Set a minimum width for the tab icon container
    },
  });

  // Return the Tab.Navigator component with custom options
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false, // Hide the default text labels for the tabs
          tabBarLabelStyle: {
            fontWeight: "bold", // Set the font weight for the custom text labels
          },
          tabBarInactiveTintColor: "rgba(106,106,106,0.85)", // Set the inactive tab color
          tabBarActiveTintColor: theme.colors.primary, // Set the active tab color to the primary color of the theme
          headerShown: false, // Hide the default header
          tabBarStyle: {
            backgroundColor: theme.colors.background, // Set the background color for the tab bar
            borderColor: "rgba(28,27,27,0)", // Set the border color for the tab bar
          },
        }}
      >
        {/* Define the Home tab */}
        <Tab.Screen
          options={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => (
              <View style={style.tabIconContainer}>
                <MaterialIcons name="houseboat" color={color} size={size - 6} />
                {focused && <Text style={style.text}>Anime</Text>}
              </View>
            ),
          })}
          name="Home"
          component={HomeRoute}
        />
        {/* Define the Manga tab */}
        <Tab.Screen
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ color, size, focused }) => (
              <View style={style.tabIconContainer}>
                <Entypo name="open-book" color={color} size={size - 6} />
                {focused && <Text style={style.text}>Manga</Text>}
              </View>
            ),
          }}
          name="MangaPage"
          component={MangaRoute}
        />
        {/* Define the Library tab */}
        <Tab.Screen
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ color, size, focused }) => (
              <View style={style.tabIconContainer}>
                <MaterialCommunityIcons name="music-box-multiple-outline" color={color} size={size - 6} />
                {focused && <Text style={style.text}>Library</Text>}
              </View>
            ),
          }}
          name="Library"
          component={LibraryRoute}
        />
      </Tab.Navigator>
    </>
  );
};
