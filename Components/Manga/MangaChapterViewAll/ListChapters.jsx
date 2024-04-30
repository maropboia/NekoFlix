import { memo, useEffect, useState } from "react";
import {
  PaddingConatiner,
  Dimensions,
  FlatList,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { EachMangaChapterCard } from "../EachMangaChapterCard";

// ListChapters is a memoized component that takes the following props:
// data: The array of chapter data
// accending: A boolean that determines whether the list should be sorted in ascending or descending order
// image: The URL of the manga cover image
// SearchText: The text used for filtering the chapter list
// MangaSlug: The slug of the manga
// MangaId: The ID of the manga
// name: The name of the manga
// imageId: The ID of the manga cover image
export const ListChapters = memo(({ 
  data, 
  accending, 
  image, 
  SearchText, 
  MangaSlug, 
  MangaId, 
  name, 
  imageId
}) => {
  // Get the window width
  const { width } = Dimensions.get('window');
  // State to store the filtered chapter data
  const [Data, setData] = useState(data);
  // State to store the sorting order
  const [accen, setAccen] = useState(accending);

  // useEffect to update the sorting order when accending changes
  useEffect(() => {
    setAccen(accending)
  }, [accending]);

  // useEffect to filter the chapter data when SearchText changes
  useEffect(() => {
    if (SearchText === ""){
      setData(data)
    } else {
      setData(data.filter((item)=>item.chapter_number.toString() === SearchText))
    }
  }, [SearchText]);

  // Render the chapter list using a FlatList component
  return (
    <PaddingConatiner>
      <FlatList 
        // Set the deceleration rate to 'fast'
        decelerationRate={'fast'}
        // Set the initial number of items to render to 10
        initialNumToRender={10}
        // Set the number of columns to 3
        numColumns={3}
        // Hide the vertical scroll indicator
        showsVerticalScrollIndicator={false}
        // Set the data prop to the sorted chapter data
        data={accen ? Data : Data.reverse()}
        // Set the content container style to justify the items and add padding at the bottom
        contentContainerStyle={{justifyContent:"space-between", paddingBottom:160}}
        // Render each chapter as a EachMangaChapterCard component
        renderItem={({item, index})=>{
          // If the index is greater than 20, add a margin to the left and right of the card
          if (index > 20){
            return <EachMangaChapterCard name={name} MangaSlug={MangaSlug} MangaId={MangaId} key={item.id} id={item.id} image={image} slug={item.slug} chapter_number={item.chapter_number} created_at={item.created_at} ContainerStyle={{marginHorizontal:width / 90}}/>
          } else {
            // Otherwise, animate the card entering the screen using FadeInDown animation
            return <Animated.View entering={FadeInDown.delay((index < 20) ? (index * 40) : (0))} style={{marginHorizontal:width / 90}}>
              <EachMangaChapterCard imageId={imageId} name={name} MangaSlug={MangaSlug} MangaId={MangaId} key={item.id} id={item.id} image={image} slug={item.slug} chapter_number={item.chapter_number} created_at={item.created_at}/>
            </Animated.View>
          }
        }}
      />
    </PaddingConatiner>
  );
});

