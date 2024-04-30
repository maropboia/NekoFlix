import { Dimensions, ImageBackground, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PaddingConatiner } from "../../../Layout/PaddingConatiner";
import { SpaceBetween } from "../../../Layout/SpaceBetween";
import { Heading } from "../../Global/Heading";
import { AirbnbRating } from "react-native-ratings";
import FormatRating from "../../../Utils/FormatRating";
import { EachGenres } from "../../Global/EachGenres";
import { Spacer } from "../../Global/Spacer";
import * as React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { ImageLoader } from "./ImageLoader";
import { GetLanguage } from "../../../LocalStorage/AppSettings";

// Memoized functional component for TopDetail
export const TopDetail = memo(function TopDetail({cover, name, rating, genres, image}){
  // Get window width
  const width = Dimensions.get("window").width
  // Set up state for title
  const [title, setTitle] = useState(name?.english ?? name?.userPreferred);
  // Callback function to get the name based on the selected language
  const getName = useCallback(async ()=>{
    const tempname = await GetLanguage()
    if (tempname === 'English') {
      setTitle( name?.english ?? name?.userPreferred)
    } else  if (tempname === "Romaji") {
      setTitle(name?.romaji ?? name?.userPreferred)
    } else {
      setTitle(name?.native ?? name?.userPreferred)
    }
  },[])
  // Run getName on initial render and when name or language changes
  useEffect(()=>{
    getName()
  },[name])
  return (
    <ImageBackground blurRadius={4}  style={{
      flex:1,
    }} source={{
      uri:cover,
    }}>
      <View style={{flex:1, backgroundColor:"rgba(0,0,0,0.44)"}}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['rgba(0,0,0,0.07)', 'rgba(0,0,0,0.2)', "rgba(0,0,0,0.72)","black"]} style={{
          height:width / 1.35,
          justifyContent:"flex-end",
        }}>
          <PaddingConatiner>
            <SpaceBetween>
              <View style={{
                flex:1,
                paddingRight:20,
                height: (width / 1.35) - 90,
                justifyContent:'flex-end',
              }}>
                {/* Display the title */}
                <Heading text={title}/>
                {/* Display the rating */}
                <AirbnbRating
                  count={5}
                  readonly={true}
                  defaultRating={FormatRating(rating)}
                  showRating={false}
                  size={15}
                  starContainerStyle={{
                    alignItems:"flex-start",
                    width:"100%",
                    justifyContent:"flex-start",
                    paddingVertical:5,
                  }}
                  reviewSize={0}
                  startingValue={FormatRating(rating)}
                  ratingCount={5}
                  isDisabled={true}
                />
                {/* Display the genres */}
                <View style={{flexDirection:"row", flexWrap:"wrap", gap:5}}>
                  {genres?.map((e,i)=>{
                    return <EachGenres title={e} key={i}/>
                  })}
                </View>
                {/* Add some spacing */}
                <Spacer/>
              </View>
              {/* Load the image */}
              <ImageLoader image={image}/>
            </SpaceBetween>
          </PaddingConatiner>
          {/* Add some spacing at the bottom */}
          <View style={{height:35}}/>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
});

