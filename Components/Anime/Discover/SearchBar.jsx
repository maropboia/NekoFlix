import { memo } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import { PlainText } from "../../Global/PlainText";

// SearchBar component with memoization for performance optimization
export const SearchBar = memo(({
  onFocus, // Function to be called when the search bar is focused
  onPressTemplate, // Function to be called when the search bar is pressed (in template mode)
  placeholder, // Placeholder text for the search bar
  onChangeText, // Function to be called when the text in the search bar is changed
  showSearchButton, // Flag to show or hide the search button
  onSearchPress, // Function to be called when the search button is pressed
  keyboard, // Keyboard type for the search bar
  searchButtonText, // Text for the search button
  showIcon, // Flag to show or hide the search icon
  autoFocus, // Flag to automatically focus the search bar on render
  isTemplate, // Flag to indicate if the search bar is in template mode
}) => {
  const style = StyleSheet.create({
    textfeild: { // Style for the search bar input field
      borderRadius: 10,
      paddingHorizontal: 10,
      flex: 1,
      color: "white",
      height: 50,
      justifyContent: 'center',
    },
    mainContainer: { // Style for the main search bar container
      backgroundColor: "#1e1c1c",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: showSearchButton ? 5 : 10,
      borderRadius: 10,
      borderColor: "rgb(25,23,23)",
      borderWidth: 1,
      elevation: 10,
    },
  })

  // Return the search bar component based on the isTemplate flag
  if (isTemplate) {
    return (
      <View style={style.mainContainer}>
        {showIcon && <Feather name="search" size={20} color={"white"}/>}
        <Pressable onPress={onPressTemplate} style={style.textfeild} placeholder={placeholder} >
          <PlainText text={placeholder}/>
        </Pressable>
        {showSearchButton && <SearchButton onPress={onSearchPress} searchButtonText={searchButtonText}/>}
      </View>
    )
  } else {
    return (
      <View style={style.mainContainer}>
        {showIcon && <Feather name="search" size={20} color="white"/>}
        <TextInput
          autoFocus={autoFocus}
          onFocus={onFocus}
          keyboardType={keyboard ? keyboard : 'default'}
          style={style.textfeild}
          placeholder={placeholder}
          onChangeText={(text)=>{
            onChangeText(text)
          }}
        />
        {showSearchButton && <SearchButton onPress={onSearchPress} searchButtonText={searchButtonText}/>}
      </View>
    );
  }
});

// Search button component
function SearchButton({onPress, searchButtonText}) {
  const theme = useTheme()
  const style = StyleSheet.create({
    button:{ // Style for the search button
      backgroundColor:theme.colors.primary,
      borderRadius:6,
      padding:10,
      flexDirection:"row",
    },
  })
  return <Pressable onPress={onPress} style={style.button}>
    <PlainText text={searchButtonText ? searchButtonText : "Search"}/>
  </Pressable>
}

