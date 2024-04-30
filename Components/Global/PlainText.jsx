import { Dimensions, StyleSheet, Text } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { GetFontSizeValue } from "../../LocalStorage/AppSettings";

// PlainText component receives text, style and numberOfLine as props
// numberOfLine is optional
export const PlainText = ({ text, style, numberOfLine }) => {
  // Get the window width
  const width = Dimensions.get('window').width;
  // Initialize state for font size
  const [FontSize, setFontSize] = useState("Medium");

  // Initial setup function to fetch font size value from local storage
  const initialSetup = useCallback(async () => {
    const data = await GetFontSizeValue();
    setFontSize(data); // Set the fetched font size value
  }, []);

  // Call initialSetup during component mount
  useEffect(() => {
    initialSetup();
  }, [initialSetup]);

  // Function to return styles based on the font size
  function getStyle() {
    if (FontSize === "Small") {
      return {
        fontWeight: "200",
        color: "rgb(218,218,218)",
        fontSize: width * 0.025, // Adjust font size based on window width
        ...style, // Incorporate any additional styles passed as props
      };
    } else if (FontSize === "Medium") {
      return {
        fontWeight: "200",
        color: "rgb(218,218,218)",
        fontSize: width * 0.032, // Adjust font size based on window width
        ...style, // Incorporate any additional styles passed as props
      };
    } else {
      return {
        fontWeight: "200",
        color: "rgb(218,218,218)",
        fontSize: width * 0.036, // Adjust font size based on window width
        ...style, // Incorporate any additional styles passed as props
      };
    }
  }

  // Return the Text component with appropriate styles and numberOfLines
  return (
    <Text
      numberOfLines={numberOfLine ? numberOfLine : 2}
      style={getStyle()}
    >
      {text}
    </Text>
  );
};
