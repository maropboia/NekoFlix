import { memo, useCallback } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { PlainText } from "../Global/PlainText";
import { useNavigation } from "@react-navigation/native";
import { FormatMangaLinks } from "../../Utils/FormatMangaLinks";

/**
 * A component that displays a single manga card with image, name, rank, and navigation to the manga details.
 * @param {{
 *   id: string, // ID of the manga
 *   image: string, // URL of the manga's image
 *   name: string, // Name of the manga
 *   rank: number, // Rank of the manga
 *   slug: string, // Slug of the manga
 * }} props - Props for the EachMangaCard component
 */
export const EachMangaCard = memo(({ id, image, name, rank, slug }) => {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();

  // Create a StyleSheet instance for reusable styles
  const style = StyleSheet.create({
    container: {
      width: width / 3.5,
      borderRadius: 5,
      marginTop: 15,
      position: "relative",
    },
    imageStyle: {
      width: width / 3.5,
      height: width / 2.2,
      borderRadius: 5,
      backgroundColor: "rgba(137,81,81,0.5)",
    },
  });

  // A callback function to get the rank color based on the rank value
  const getRankColor = useCallback(
    (rank) => {
      if (rank === 1) {
        return {
          backgroundColor: "#EBB62D",
          textColor: "#8e6129",
        };
      } else if (rank === 2) {
        return {
          backgroundColor: "#9CE53E",
          textColor: "#3F8A2D",
        };
      } else if (rank === 3) {
        return {
          backgroundColor: "#D3E7F3",
          textColor: "#3D4C64",
        };
      } else {
        return {
          backgroundColor: "#E0D59E",
          textColor: "#A87D3F",
        };
      }
    },
    []
  );

  // Return the component with appropriate styles and functionality
  return (
    <Pressable
      onPress={() => {
        if (id && slug) {
          navigation.push("MangaDetails", { id, slug, image, name });
        }
      }}
      style={style.container}
    >
      {/* Render the rank badge if rank is provided */}
      {rank && (
        <View
          style={{
            position: "absolute",
            zIndex: 100,
            borderRadius: 1000000,
            left: -5,
            top: -5,
            elevation: 10,
            height: 30,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: getRankColor(rank).backgroundColor,
          }}
        >
          <PlainText
            text={"#" + rank}
            style={{ fontWeight: "700", color: getRankColor(rank).textColor }}
          />
        </View>
      )}
      {/* Render the manga image with appropriate styles */}
      <FastImage
        style={style.imageStyle}
        source={{
          uri: FormatMangaLinks.getMangaCover(image, id),
        }}
      />
      {/* Render the manga name with appropriate styles */}
      <PlainText text={name} style={{ fontWeight: "600" }} />
    </Pressable>
  );
});
