import { MainWrapper } from "../../Layout/MainWrapper"; // Importing MainWrapper component from ../../Layout
import { PlainText } from "../../Components/Global/PlainText"; // Importing PlainText component from ../../Components/Global
import { Heading } from "../../Components/Global/Heading"; // Importing Heading component from ../../Components/Global
import { PaddingConatiner } from "../../Layout/PaddingConatiner"; // Importing PaddingConatiner component from ../../Layout
import FastImage from "react-native-fast-image"; // Importing FastImage component from react-native-fast-image
import { Pressable, Text, ToastAndroid, View } from "react-native"; // Importing necessary components from react-native
import Clipboard from '@react-native-clipboard/clipboard'; // Importing Clipboard component from @react-native-clipboard/clipboard
import { Spacer } from "../../Components/Global/Spacer"; // Importing Spacer component from ../../Components/Global
import Feather from "react-native-vector-icons/Feather"; // Importing Feather component from react-native-vector-icons/Feather

export const UpiDetail = () => { // Defining a functional component named UpiDetail
  return (
    <MainWrapper> {/* Wrapping the component with MainWrapper */}
      <PaddingConatiner> {/* Wrapping the component with PaddingConatiner */}
        <Heading text={"UPI Details"} style={{textAlign:"center"}}/> {/* Displaying a heading with text "UPI Details" */}
        <Spacer/> {/* Adding some vertical spacing */}
       <View style={{ // Creating a View component with some styles
         alignItems:"center", // Centering the items horizontally
         justifyContent:"center", // Centering the items vertically
         padding:10, // Adding some padding
       }}>
         <FastImage source={require("../../assets/AppImages/UpiQr.png")} style={{ // Displaying an image using FastImage
           height: 200, // Setting the height of the image
           width: 200, // Setting the width of the image
           borderRadius: 10, // Adding some border radius to the image
         }}/>
         <Spacer/> {/* Adding some vertical spacing */}
         <Text style={{color:"white"}}> {/* Displaying some text */}
            Scan the QR code to donate
         </Text>
        <View style={{flexDirection:"row"}}> {/* Creating a View component with flexDirection set to row */}
          <Text style={{color:"white", fontWeight:"bold"}}>UPI : </Text> {/* Displaying some text with white color and bold font weight */}
          <Text style={{color:"white", fontWeight:"bold"}} selectable={true}>ankit.kum.sha9933@oksbi</Text> {/* Displaying some text with white color, bold font weight and selectable property set to true */}
        </View>
         <Spacer/> {/* Adding some vertical spacing */}
         <Pressable onPress={()=>{ // Creating a Pressable component with an onPress event
            Clipboard.setString("ankit.kum.sha9933@oksbi") // Setting the clipboard string to "ankit.kum.sha9933@oksbi"
           ToastAndroid.showWithGravity(
             `UPI Id Copied`, // Displaying a Toast message with text "UPI Id Copied"
             ToastAndroid.SHORT, // Setting the duration of the Toast message to short
             ToastAndroid.CENTER, // Setting the gravity of the Toast message to center
           );
         }} style={{flexDirection:"row", alignItems:"center", gap:10, backgroundColor:"rgb(40,38,38)", padding:10, borderRadius:10}}> {/* Styling the Pressable component */}
            <PlainText text={"Copy UPI"} style={{color:"white"}}/> {/* Displaying some text with white color */}
           <Feather name={"copy"} color={"white"}/> {/* Displaying a Feather icon with name "copy" and white color */}
         </Pressable>
       </View>
      </PaddingConatiner>
    </MainWrapper>
  );
};

