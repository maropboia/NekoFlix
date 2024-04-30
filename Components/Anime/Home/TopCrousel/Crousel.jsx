import * as React from 'react';
import { Dimensions } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
+// Import EachCrousel component for rendering carousel items
import { EachCrousel } from "./EachCrousel";
+// Import FormatRating utility for formatting ratings
import FormatRating from "../../../../Utils/FormatRating";
+// Import memo for performance optimization
import { memo } from "react";
+// Import SimpleLoading component for displaying loading state
import SimpleLoading from "../../../Global/Loading/SimpleLoading";

-// Functional component Crousel receives isLoading and Data props
function Crousel({isLoading, Data}) {
-// Get window width
  const width = Dimensions.get('window').width;
  return (
    <>
+// If isLoading is true, render SimpleLoading component
      {isLoading && <SimpleLoading containerStyle={{height:width / 1.2}} text={"Getting Anime"}/>}
+// If isLoading is false, render the Carousel component
      {!isLoading &&  <Carousel
        pagingEnabled={true}
        windowSize={3}
        loop
        width={width}
        height={width / 1.1}
        autoPlay={true}
        autoPlayInterval={2000}
        data={Data}
        snapEnabled={true}
        scrollAnimationDuration={1000}
+// Render EachCrousel component for each item in the data array
        renderItem={({item,index}) => {
          return <EachCrousel data={item}
                              id={item?.id ?? 0}
                              name={item?.title}
                              image={item?.image ?? ""}
                              backgroundImage={item?.cover ?? ""}
                              geners={item?.genres ?? []}
                              trailer={item?.trailer?.id}
                              ratings={FormatRating(item?.rating ?? 0)}
          />
        }}
      />}
    </>
  );
}

+// Export memoized Crousel component
export default memo(Crousel);
