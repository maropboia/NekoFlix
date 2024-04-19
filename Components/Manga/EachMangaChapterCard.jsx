import { memo } from "react";
import { Dimensions, ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { PlainText } from "../Global/PlainText";
import { useNavigation } from "@react-navigation/native";
import { FormatDate } from "../../Utils/FormatDate";
import { SmallText } from "../Global/SmallText";

export const EachMangaChapterCard = memo(({id, chapter_number, slug, created_at, image, ContainerStyle, MangaSlug, MangaId}) => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation()
  const style = StyleSheet.create({
    container:{
      width:width / 3.5,
      borderRadius:5,
      marginTop:10,
      overflow:"hidden",
      ...ContainerStyle,
    },
    imageStyle:{
      width:width / 3.5,
      height:width / 2.2,
      borderRadius:5,
      justifyContent:"flex-end",
    },
  })
  return (
    <Pressable onPress={()=>{
      navigation.push("MangaChaptersViewer",{id, slug, MangaSlug, MangaId})
    }} style={style.container}>
      <ImageBackground style={style.imageStyle} source={{
        uri: image,
      }}>
      <View style={{backgroundColor:"rgba(0,0,0,0.74)", padding:5}}>
        <PlainText text={'Ch. ' + chapter_number} style={{fontWeight:"600", color:"white"}}/>
        <SmallText text={FormatDate(created_at)}/>
      </View>
      </ImageBackground>
    </Pressable>
  );
});
