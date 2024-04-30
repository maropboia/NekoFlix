// Import the LinearGradient component from 'react-native-linear-gradient'
// This component is used to create a linear gradient effect
import LinearGradient from 'react-native-linear-gradient';

// Import the createShimmerPlaceholder function from 'react-native-shimmer-placeholder'
// This function is used to create a shimmer effect for loading screens
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

// Import the Dimensions component from 'react-native'
// This component is used to get the dimensions of the screen
import { Dimensions } from "react-native";

// Create a ShimmerPlaceHolder component using the createShimmerPlaceholder function
// This component is used to create a shimmer effect for the loading screen
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

// Define the FullScreenLoading component
// This component is used to display a full-screen loading shimmer effect
export const FullScreenLoading = () => {
  // Get the width and height of the screen
  const { width, height } = Dimensions.get("window");

  // Return the JSX for the FullScreenLoading component
  // The ShimmerPlaceHolder component is used to create a full-screen shimmer effect
  // The duration prop is used to set the duration of the shimmer effect
  // The location prop is used to set the position of the shimmer effect
  // The shimmerColors prop is used to set the colors of the shimmer effect
  // The height and width props are used to set the size of the shimmer effect
  // The style prop is used to set the style of the shimmer effect
  return (
    <ShimmerPlaceHolder
      duration={1700}
      location={[0,0.5,1]}
      shimmerColors={['#202020','rgba(11,11,11,0.2)','rgba(0,0,0,0.35)']}
      height={height}
      width={width}
      style={{overflow: 'hidden', borderRadius:5}}
    />
  );
};
