import { MainWrapper } from "../../Layout/MainWrapper";
import FastImage from "react-native-fast-image";
import { Linking, Pressable, ScrollView, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { Spacer } from "../../Components/Global/Spacer";
import { PlainText } from "../../Components/Global/PlainText";
import { Heading } from "../../Components/Global/Heading";
import { SmallText } from "../../Components/Global/SmallText";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

// AboutProject component displays information about the project and its developer
export const AboutProject = () => {
  const TopHeight = 120; // Height of the top section
  const ProjectName = "NekoFlex"; // Name of the project
  const navigation = useNavigation(); // Navigation hook for navigating to other screens

  return (
    <MainWrapper>
      {/* ScrollView for scrolling through the content */}
      <ScrollView>
        {/* Add some space */}
        <Spacer/>
        <Spacer/>
        <View style={{paddingHorizontal:10}}>
          {/* Top section with developer's image, name, and social media links */}
          <View style={{
            height:TopHeight,
            flexDirection:"row",
            gap:10,
          }}>
            {/* Developer's image */}
            <FastImage source={require("../../assets/AppImages/me.jpeg")} style={{
              height: TopHeight,
              width: TopHeight,
              borderRadius:200000,
            }}/>
            {/* Developer's name and other details */}
            <View style={{justifyContent:"center"}}>
              <PlainText text={"Developed By"}/>
              <Heading text={"Ankit Kumar Shah"} nospace={true}/>
              <View style={{flexDirection:"row", gap:10}}>
                {/* Social media buttons for Github, LinkedIn, and Instagram */}
                <EachSocialButton title={"Github"} icon={<AntDesign name={"github"}/>} color={"rgb(42,42,42)"} url={"https://github.com/Infinite-Null"}/>
                <EachSocialButton title={"LinkedIn"} icon={<AntDesign name={"linkedin-square"}/>} color={"rgb(23,59,100)"} url={"https://www.linkedin.com/in/ankit-kum-shah/"}/>
                <EachSocialButton title={"Instagram"} icon={<AntDesign name={"instagram"}/>} color={"rgb(83,43,43)"} url={"https://www.instagram.com/ankit_kumar.cpp/"}/>
              </View>
            </View>
          </View>
          {/* Add some space */}
          <Spacer/>
          <Spacer/>
          {/* Join the community section */}
          <PlainText text={"Want to stay updated?"} nospace={true}/>
          <SmallText text={"join the community."}/>
          <Spacer/>
          {/* Telegram and Whatsapp community buttons */}
          <View style={{flexDirection:"row", gap:10, alignItems:"center", justifyContent:"space-between"}}>
            <EachCommunityButton title={"Telegram"} icon={<Fontisto name={"telegram"} size={35}/>} color={"rgb(50,95,123)"}  url={"https://t.me/+-irbEXtzhwI1NzU1"}/>
            <EachCommunityButton title={"Whatsapp"} icon={<FontAwesome name={"whatsapp"} size={35}/>} color={"rgb(52,123,50)"}  url={"https://whatsapp.com/channel/0029VaCr9oTIt5s5DxEQCI11"}/>
          </View>
          <Spacer/>
          {/* Are you a developer? section */}
          <PlainText text={"Are you a developer?"} nospace={true}/>
          <SmallText text={"Contribute to the project."}/>
          <Spacer/>
          {/* Project repository button */}
          <View style={{
            height:100,
          }}>
            <EachCommunityButton style={{
              justifyContent:"space-around",
            }} title={ProjectName} icon={<AntDesign name={"github"} size={40}/>} color={"rgb(46,46,46)"} subTitle={'An open source anime watching platform.'} url={"https://github.com/Infinite-Null/NekoFlix"}/>
          </View>
          <Spacer/>
          {/* Request a new feature or report a bug section */}
          <PlainText text={"Request a new feature?"} nospace={true}/>
          <SmallText text={"Or report a bug?"}/>
          <Spacer/>
          {/* Contact developer section */}
          <View style={{
            height:120,
          }}>
            <EachCommunityButton style={{
              justifyContent:"space-around",
            }} title={""} icon={<Entypo name={"bug"} size={40}/>} color={"rgb(98,38,38)"} subTitle={'You can always request me new features or report a bug in any of my social media handles or you can mail me at :\nankit.kum.sha9933@gmail.com\n\nEven you can raise an issue in Github'} url={""}/>
          </View>
          <Spacer/>
          {/* Donate section */}
          <PlainText text={"Enjoying the app?"} nospace={true}/>
          <PlainText text={"Donate me 😁"}/>
          <Spacer/>
          {/* Donate buttons */}
          <View style={{
            flexDirection:"row",
            gap:10,
          }}>
            {/* Buy Me A Coffee donate button */}
            <EachDonateButton image={require("../../assets/AppImages/unnamed.png")} title={"Buy Me A Coffee"} icon={<Feather name={"coffee"}/>} color={"#FFDD00"}
              onPress={()=>{
                Linking.openURL("https://www.buymeacoffee.com/ankitkumarshah").catch(err => console.error("Couldn't load page", err));
              }}
            />
            {/* Donate Using UPI donate button */}
            <EachDonateButton onPress={()=>{
                navigation.navigate("UpiDetails")
            }} image={require("../../assets/AppImages/Upi.png")} title={"Donate Using UPI"} icon={<Feather name={"coffee"}/>} color={"#FFFFFF"}/>
          </View>
        </View>
      </ScrollView>
    </MainWrapper>
  );
};

// EachSocialButton component for rendering social media buttons
function EachSocialButton({icon,color,title,url}) {
  function loadInBrowser () {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  }
  return <Pressable onPress={loadInBrowser} style={{
    flexDirection:"row",
    backgroundColor:color,
    padding:5,
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
    gap:5,
  }}>
    {/* Social media title */}
    <SmallText text={title}/>
    {/* Social media icon */}
    {icon}
  </Pressable>
}

// EachDonateButton component for rendering donate buttons
export function EachDonateButton({image,color,title,onPress}) {
  return <Pressable onPress={onPress} style={{
    flexDirection:"row",
    backgroundColor:color,
    padding:5,
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
    flex:1,
    gap:0,
  }}>
    {/* Donate button image */}
    <FastImage source={image}  style={{
      height:50,
      width:50,
      borderRadius:10,
    }} resizeMode={FastImage.resizeMode.cover}/>
    {/* Donate button title */}
    <PlainText text={title} style={{color:"black", fontWeight:"bold"}}/>
  </Pressable>
}

// EachCommunityButton component for rendering community buttons
function EachCommunityButton({icon,color,title,url, subTitle, style}){
  function loadInBrowser () {
    if (url !== ""){
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  }
  return <Pressable onPress={loadInBrowser} style={{
    flexDirection:"row",
    backgroundColor:color,
    padding:subTitle ? 5 : 15,
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
    flex:1,
    gap:20,
    ...style,
  }}>
    {/* Community button title and subtitle */}
    <View>
      {title !== "" && <Heading text={title} nospace={true}/>}
      {subTitle && <SmallText text={subTitle} style={{maxWidth:270}} maxLine={20}/>}
    </View>
    {/* Community button icon */}
    {icon}
  </Pressable>
}
