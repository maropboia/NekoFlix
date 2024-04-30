import { memo } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { PlainText, SmallText } from "../../../../Global/index"; // Import PlainText and SmallText components

/**
 * A functional component that renders a single episode card with a title, image, and number.
 * This component is memoized to prevent unnecessary re-renders.
 *
 * @param {object} props - The props that are passed to the component.
 * @param {string} props.title - The title of the episode.
 * @param {string} props.image - The URL of the episode's image.
 * @param {number} props.number - The number of the episode.
 * @returns {JSX.Element} The rendered episode card.
 */
export const EachEpisodeCard = memo(function EachEpisodeCard({ title, image, number }) {
  // Create a new StyleSheet object to define the styles for the component.
  const style = StyleSheet.create({
    container: {
      width: 150, // Set the width of the container
      height: 100, // Set the height of the container
      borderRadius: 5, // Set the border radius of the container
      backgroundColor: "rgb(32,32,32)", // Set the background color of the container
      margin: 10, // Set the margin of the container
      justifyContent: "flex-end", // Set the justify content of the container
    },
    image: {
      width: 150, // Set the width of the image
      height: 100, // Set the height of the image
      borderRadius: 5, // Set the border radius of the image
      backgroundColor: "rgb(79,56,56)", // Set the background color of the image
      position: "absolute", // Set the position of the image to absolute
    },
  });

  // Return the JSX that represents the episode card.
  return (
    <View style={style.container}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover} // Resize the image to cover the container
        source={{ uri: image }} // Set the source of the image
        style={style.image} // Apply the image style
      />
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.78)", // Set the background color of the view
          paddingHorizontal: 5, // Set the padding horizontal of the view
        }}
      >
        <PlainText text={"Episode " + number} /> {/* Render the episode number */}
        <SmallText text={title} style={{ color: "rgb(243,243,243)" }} /> {/* Render the episode title */}
      </View>
    </View>
  );
});

