import { memo } from "react";
import { PaddingConatiner } from "../../../Layout/PaddingConatiner"; // A component that adds padding around its children
import { EachMangaChapterCard } from "../EachMangaChapterCard"; // A component that displays a single manga chapter card
import { EachHeaderSection } from "../../Global/EachHeaderSection"; // A component that displays a header section with a title and a "View All" button
import { useNavigation } from "@react-navigation/native"; // A hook that allows you to use navigation functions in your component
import { View } from "react-native"; // A basic building block for building layouts in React Native

// The ChaptersDetails component receives the following props:
// - image: The image to be displayed in the header section
// - id: The ID of the manga
// - slug: The slug of the manga
// - data: An array of chapter objects
// - name: The name of the manga
// - imageId: The ID of the manga image
export const ChaptersDetails = memo(({ image, id, slug, data, name, imageId }) => {
  // Use the useNavigation hook to access the navigation object
  const navigation = useNavigation();

  return (
    <PaddingConatiner>
      {/* Render the EachHeaderSection component with the title "Chapters" and a "View All" button */}
      <EachHeaderSection title={"Chapters"} showViewAll={true} OnPress={() => {
        // Navigate to the "ViewAllChapters" screen and pass the required props
        navigation.navigate("ViewAllChapters", { data, image, id, slug, name, imageId });
      }} />
      {/* Add some padding around the chapters list */}
      <View style={{ paddingHorizontal: 10 }}>
        {/* Display the first 9 chapters using the EachMangaChapterCard component */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", gap: 10 }}>
          {data.slice(0, 9).map((item, i) => (
            <EachMangaChapterCard
              // Pass the required props to the EachMangaChapterCard component
              imageId={imageId}
              name={name}
              MangaSlug={slug}
              MangaId={id}
              key={i}
              id={item.id}
              image={image}
              slug={item.slug}
              chapter_number={item.chapter_number}
              created_at={item.created_at}
            />
          ))}
        </View>
      </View>
    </PaddingConatiner>
  );
});

