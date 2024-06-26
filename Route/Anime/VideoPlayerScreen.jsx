import { Player } from "../../Components/Anime/VideoplayerScreen/Player";
import { Heading } from "../../Components/Global/Heading";
import { PaddingConatiner } from "../../Layout/PaddingConatiner";
import { PlainText } from "../../Components/Global/PlainText";
import { Spacer } from "../../Components/Global/Spacer";
import { SpaceBetween } from "../../Layout/SpaceBetween";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ReadMore from "@fawazahmed/react-native-read-more";
import { FormatDescription } from "../../Utils/FormatDescription";
import { SelectList } from "react-native-dropdown-select-list/index";
import { useCallback, useEffect, useState } from "react";
import SimpleLoading from "../../Components/Global/Loading/SimpleLoading";
import { getAnimeEpisodesStreamingLink } from "../../Api/AnimeData";
import { GetDefaultQuality } from "../../LocalStorage/AppSettings";
export const VideoPlayerScreen = ({route, navigation}) => {
  const {width, height} = Dimensions.get("window")
  const [Loading, setLoading] = useState(true);
  const [StreamingUrl, setStreamingUrl] = useState("");
  const [Quality, setQuality] = useState("Auto");
  const styles = StyleSheet.create({
    textStyle:{
      paddingHorizontal:10,
      fontSize:13,
      color:"white"
    },
  })
  const {id, description, title, number, isSub} = route.params
  const data = [
    {value:"Auto"},
    {value:"1080p"},
    {value:"720p"},
    {value:"480p"},
    {value:"360p"},
  ]
  function getQualityUrl() {
    if (Quality === "Auto"){
      return StreamingUrl
    } else if (Quality === "1080p"){
      return  StreamingUrl.slice(0,StreamingUrl.length - 4) + "1080.m3u8"
    } else if (Quality === "720p"){
      return  StreamingUrl.slice(0,StreamingUrl.length - 4) + "720.m3u8"
    } else if (Quality === "480p"){
      return  StreamingUrl.slice(0,StreamingUrl.length - 4) + "480.m3u8"
    } else {
      return  StreamingUrl.slice(0,StreamingUrl.length - 4) + "360.m3u8"
    }
  }
  const getLink = useCallback(async ()=>{
    try {
      let finalId = id
      if (!isSub) {
        const tempId = id
        const b = "-dub"
        const position = tempId.lastIndexOf("-episode-")
        finalId = [tempId.slice(0, position), b, tempId.slice(position)].join('');
      }
      const {sources} = await getAnimeEpisodesStreamingLink(finalId)
      const defaultUrl = sources.filter((e)=>e.quality === "default")
      setStreamingUrl(defaultUrl[0].url)
    } catch (e) {
      console.log(e + "Streaming Link error");
    } finally {
      setLoading(false)
    }
  },[])
  const getDefaultQuality = useCallback(async ()=>{
    const temp = await GetDefaultQuality()
    setQuality(temp)
  },[])
  useEffect(() => {
    getDefaultQuality()
    getLink()
  }, []);
  return (
  <>
    {!Loading && <Player navigation={navigation} url={getQualityUrl()} number={number}/>}
    {Loading && <SimpleLoading containerStyle={{height:width * 0.95,
      width:width}} text={"getting best streaming link"}/>}
    <Spacer/>
   <PaddingConatiner>
     <SpaceBetween>
       <View>
         <Heading text={title} style={{
           maxWidth:width * 0.80,
         }}/>
         <PlainText text={"Episode " + number}/>
       </View>
       <PlainText text={isSub ? "SUB" : "DUB"} style={{
         backgroundColor:"rgb(190,142,142)",
         padding:5,
         borderRadius:10,
         color:"rgb(0,0,0)",
         fontWeight:"900",
       }}/>
     </SpaceBetween>
     <Spacer/>
       <PlainText text={"Quality"} style={{fontWeight:"900"}}/>
     <Spacer/>
       <SelectList
         placeholder={Quality}
         search={false}
         setSelected={(val) => {
           setQuality(val)
         }}
         data={data}
         save="value"
         arrowicon={<Text style={{paddingHorizontal:5,color:"white"}}>↓</Text>}
         inputStyles={{
           color:"white",
         }}
         dropdownTextStyles={{color:"white"}}
       />
     <Spacer/>
   </PaddingConatiner>
    <ReadMore numberOfLines={4} style={styles.textStyle}>
      {FormatDescription(description)}
    </ReadMore>
  </>
  );
};

