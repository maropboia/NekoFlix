import { FlatList, StyleSheet } from "react-native";
import { ShimmerLoadingEachAnime } from "./ShimmerLoadingEachAnime";

// Component for rendering a horizontal FlatList with shimmer animations
// during data loading, giving a loading effect for each section.
export const EachSectionLoading = () => {
  // Array of 4 elements, used as placeholder data for the FlatList.
  const value = [1, 2, 3, 4];

  // Creating a StyleSheet object to define the styles for the FlatList.
  const stylesheet = StyleSheet.create({
    scrollViewStyle: {
      // Adding gap between components.
      gap: 10,
      // Adding padding to the horizontal edges.
      paddingHorizontal: 10,
    },
  });

  // Returning the FlatList component with the following properties:
  // - data: The array of elements to display in the FlatList.
  // - horizontal: Set to true to render the FlatList horizontally.
  // - showsHorizontalScrollIndicator: Set to false to hide the scroll indicator.
  // - scrollEventThrottle: The interval in milliseconds for scroll event updates.
  // - contentContainerStyle: The StyleSheet object defining the styles for the FlatList.
  // - renderItem: A function that returns the ShimmerLoadingEachAnime component for each item in the data array.
  return (
    <FlatList
      data={value}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={20000}
      contentContainerStyle={stylesheet.scrollViewStyle}
      renderItem={() => <ShimmerLoadingEachAnime />}
    />
  );
};
