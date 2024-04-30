import { View } from "react-native";

/**
 * A functional component that renders a View with some padding.
 * This component accepts two props: `children` and `style`.
 * @param {React.ReactNode} children - The content to be rendered inside the padded View.
 * @param {Object} style - An object containing any additional style properties to be applied to the View.
 * @returns {JSX.Element} A View element with padding and any additional styles specified in the `style` prop.
 */
export const PaddingConatiner = ({children, style}) => {
  return (
    <View style={{
      paddingHorizontal:10, // Horizontal padding of 10 (by default).
      ...style, // Any additional styles specified in the `style` prop.
    }}>
      {children}
    </View>
  );
};
