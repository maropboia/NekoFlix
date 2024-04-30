import { memo } from "react";
import FastImage from "react-native-fast-image";
import { Dimensions, ImageBackground, View } from "react-native";
import { Heading } from "../../Global/Heading";
import { SpaceBetween } from "../../../Layout/SpaceBetween";
import { EachButton } from "../EachButton";
import { Spacer } from "../../Global/Spacer";
import Entypo from "react-native-vector-icons/Entypo";
import { SmallText } from "../../Global/SmallText";
import { FormatMangaLinks } from "../../../Utils/FormatMangaLinks";
import { EachHeaderSection } from "../../Global/EachHeaderSection";
import Foundation from "react-native-vector-icons/Foundation";
import { useNavigation } from "@react-navigation/native";
import { PaddingConatiner } from "../../../Layout/PaddingConatiner";

// RecommendedManga component receives a prop "manga" which is an object containing manga details
export const RecommendedManga = memo(({ manga }) => {
  // Get the window width
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();

  // The component returns a view containing a background image, a manga cover image, manga details, and a read button
  return (
    <>
      {/* Padding container and header section */}
      <PaddingConatiner>
        <EachHeaderSection title={"Read Next"} showViewAll={false} />
      </PaddingConatiner>
      <ImageBackground
        // Set the background image using the manga cover and id
        source={{ uri: FormatMangaLinks.getMangaCover(manga?.cover, manga?.id) }}
        style={{ width: "100%", aspectRatio: 2, zIndex: 100 }}
        resizeMode={FastImage.resizeMode.cover}
      >
        <View
          style={{
            // Set the background color and flex direction of the parent view
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.71)",
            flexDirection: "row",
            height: "150%",
          }}
        >
          {/* Manga cover image */}
          <FastImage
            source={{ uri: FormatMangaLinks.getMangaCover(manga?.cover, manga?.id) }}
            style={{
              width: width * 0.36,
              height: "100%",
              margin: 10,
              borderRadius: 5,
              position: "relative",
              elevation: 10,
              backgroundColor: "rgba(137,81,81,0.5)",
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          {/* Manga details and read button */}
          <View
            style={{
              flex: 1,
              height: "100%",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            {/* Manga title */}
            <Heading text={manga?.title} style={{ color: "rgb(255,255,255)" }} />
            {/* Manga details (views and chapters) */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 10,
                width: "90%",
              }}
            >
              {/* EachDescriptionWithIcon component */}
              <EachDescriptionWithIcon
                icon={<Entypo name={"eye"} size={15} color={"white"} />}
                text={"Views: "}
                count={manga?.views_count}
              />
              <EachDescriptionWithIcon
                icon={<Foundation name={"page-multiple"} size={15} color={"white"} />}
                text={"Chapters: "}
                count={manga?.chapters_count}
              />
            </View>
            {/* Spacer */}
            <Spacer />
            {/* SpaceBetween component and read button */}
            <SpaceBetween style={{ gap: 5, marginRight: 5 }}>
              <EachButton
                // On press function to navigate to the MangaDetails screen
                Onpress={() => {
                  if (manga?.id && manga?.slug) {
                    navigation.push("MangaDetails", {
                      id: manga?.id,
                      slug: manga?.slug,
                      image: manga?.cover,
                      name: manga?.title,
                    });
                  }
                }}
                title={"Read"}
                icon={
                  <Entypo
                    name={"controller-play"}
                    color={"black"}
                    size={20}
                  />
                }
              />
            </SpaceBetween>
          </View>
        </View>
      </ImageBackground>
    </>
  );
});

// EachDescriptionWithIcon component receives icon, text, and count props
function EachDescriptionWithIcon({ icon, text, count }) {
  return (
    <View
      style={{
        // Set the background color, padding, border radius, and flex direction of the view
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgb(21,20,20)",
        padding: 10,
        borderRadius: 5,
        gap: 8,
      }}
    >
      {/* Icon */}
      {icon}
      {/* Text */}
      <SmallText text={text} />
      {/* Count */}
      <SmallText text={count} style={{ fontWeight: "600" }} />
    </View>
  );
}
