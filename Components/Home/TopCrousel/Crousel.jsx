import * as React from 'react';
import { Dimensions } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { EachCrousel } from "./EachCrousel";
import FormatRating from "../../../Utils/FormatRating";
import { memo } from "react";
import { CrouselLoading } from "../../Global/Loading/CrouselLoading";

function Crousel({isLoading, Data}) {
  const width = Dimensions.get('window').width;
  return (
    <>
      {isLoading && <CrouselLoading/>}
      {!isLoading &&  <Carousel
        windowSize={3}
        loop
        width={width}
        height={width / 1.2}
        autoPlay={true}
        autoPlayInterval={2000}
        data={Data}
        snapEnabled={true}
        scrollAnimationDuration={1000}
        renderItem={({item,index}) => {
          return <EachCrousel title={item?.title?.english ?? "No Title"}
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

export default memo(Crousel);
