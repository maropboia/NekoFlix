import { FlatList, StyleSheet} from "react-native";
import { EachAnimeCard } from "../../../Global/EachAnimeCard";
import { Spacer } from "../../../Global/Spacer";
import { memo } from "react";
import { PaddingConatiner } from "../../../../Layout/PaddingConatiner";
import { EachSectionLoading } from "../../../Global/Loading/EachSectionLoading";
import { FadeInDownLayout } from "../../../../Layout/FadeInDownLayout";
import { EachHeaderSection } from "../../../Global/EachHeaderSection";

// Sections component is a memoized functional component that takes in 4 props:
// results: an array of anime objects
// title: a string that represents the title of the anime list
// isLoading: a boolean that represents whether the data is still loading or not
// navigation: an object that allows navigation to other screens
export const Sections = memo(function Sections({results, title, isLoading, navigation}) {

  // create a stylesheet object using StyleSheet.create()
  // scrollViewStyle is an object that contains the styles for the scrollview
  const stylesheet = StyleSheet.create({
    scrollViewStyle:{
      gap:10, // add a gap of 10 between each anime card
      paddingHorizontal:10, // add horizontal padding of 10 to the scrollview
    },
  })

  // return a JSX element that contains:
  // 1. a PaddingConatiner component that wraps the EachHeaderSection component
  // 2. a Spacer component that adds vertical spacing between the EachHeaderSection and the FlatList
  // 3. a FadeInDownLayout component that wraps the FlatList and the EachSectionLoading component
  // 4. a FlatList component that renders EachAnimeCard components based on the data passed in through the "results" prop
  // 5. an EachSectionLoading component that displays a loading animation when the data is still loading
  return (
    <>
     <PaddingConatiner>
       <EachHeaderSection title={title} showViewAll={true} OnPress={()=>{ if (!isLoading) {
         navigation.navigate("ViewAllAnimeSection",{title:title, data:results})
       }}}/>
     </PaddingConatiner>
      <Spacer/>
      <FadeInDownLayout>
        {isLoading && <EachSectionLoading/>}
        {!isLoading && <FlatList horizontal={true} // set the FlatList to be horizontal
                                 showsHorizontalScrollIndicator={false} // hide the horizontal scroll indicator
                                 scrollEventThrottle={20000} // set the scroll event throttle to 20000ms
                                 contentContainerStyle={stylesheet.scrollViewStyle} // apply the scrollViewStyle object to the content container
                                 data={results} // set the data source to the "results" prop
                                 keyExtractor={(item,index)=>index.toString()} // set the key for each item to its index in the "results" array
                                 renderItem={({ item, index })=>( // render EachAnimeCard components for each item in the "results" array
                                   <EachAnimeCard
                                     key={index}
                                     image={item?.image} // set the image source to the "image" property of the anime object
                                     name={item?.title} // set the anime name to the "title" property of the anime object
                                     status={item?.status} // set the anime status to the "status" property of the anime object
                                     genres={item?.genres} // set the anime genres to the "genres" property of the anime object
                                     data={item} // pass the entire anime object to the EachAnimeCard component
                                     id={item.id} // set the anime id to the "id" property of the anime object
                                     navigation={navigation} // pass the navigation object to the EachAnimeCard component
                                   />)}
        />}
      </FadeInDownLayout>
    </>
  );
})

