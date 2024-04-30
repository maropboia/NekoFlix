import { memo } from "react"; // Import memo to memoize the component
import { StyleSheet, View } from "react-native"; // Import StyleSheet and View from react-native
import { PlainText } from "../../../../Global/PlainText"; // Import PlainText component
import { SmallText } from "../../../../Global/SmallText"; // Import SmallText component
import { ImageLoader } from "../../ImageLoader"; // Import ImageLoader component

export const EachVoiceActorDetail = memo(function EachVoiceActorDetail({language, name, image}){ // Memoized functional component that receives three props: language, name, and image

  const style = StyleSheet.create({ // Create a StyleSheet object containing styles for the main container and the image
    mainContainer:{
      borderRadius:10,
      flexDirection:"row",
      alignItems:"center",
      gap:10,
    },
    image:{
      height:80,
      width:80,
      borderRadius:1000,
    },
  })

  const {full,native,userPreferred} = name // Destructure name prop into full, native, and userPreferred

  return <View style={style.mainContainer}> {/* Return a View component that contains an ImageLoader component and another View component */}
    <ImageLoader image={image} style={style.image}/> {/* Load and display the image prop */}
   <View>
     <PlainText text={full} numberOfLine={1}/> {/* Display the full name property */}
     <SmallText text={language} maxLine={1} /> {/* Display the language prop */}
   </View>
  </View>
});

