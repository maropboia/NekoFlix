import { View } from "react-native";

/**
 * A component that arranges its children with space between them in a horizontal row.
 * @param {React.ReactNode} children - The elements to be arranged.
 * @param {Object} style - Additional inline styles to be applied to the View container.
 * @returns {JSX.Element} A horizontal row of elements with space between them.
 */
export const SpaceBetween = ({children, style}) => {
  return (
    <View style={{ // The container View
      justifyContent: "space-between", // This aligns children along the horizontal axis, distributing available space evenly between them
      alignItems: 'center', // This centers the children along the vertical axis
      flexDirection: "row", // This arranges the children in a horizontal row
      ...style, // This applies any additional inline styles passed as a prop
    }}>
      {children}
    </View>
  );
};

