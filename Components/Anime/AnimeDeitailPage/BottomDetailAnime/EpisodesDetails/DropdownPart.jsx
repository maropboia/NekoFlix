import { memo } from "react";
import { Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list/index";
import { Spacer } from "../../../../Global/Spacer";

// DropdownPart is a memoized functional component that receives totalParts, updateSelected, totalLength, and TotalEpisodesDisplay as props
export const DropdownPart = memo(function DropdownPart({
  totalParts,
  updateSelected,
  totalLength,
  TotalEpisodesDisplay,
}) {
  // Create an array of dropdown options with values based on the totalParts prop
  const data = Array.from({ length: totalParts }, (_, i) => {
    if (i === totalParts - 1) {
      return { value: `${(i * TotalEpisodesDisplay) + 1} - ${totalLength}` };
    } else {
      return { value: `${(i * TotalEpisodesDisplay) + 1} - ${(i * TotalEpisodesDisplay) + TotalEpisodesDisplay}` };
    }
  });

  // The SelectList component is used to create a dropdown with the data array
  return (
    <>
      <View // Wrapper for the dropdown
        style={{
          zIndex: 100, // Ensure the dropdown is above other elements
          minWidth: 150, // Set minimum width for the dropdown
        }}
      >
        <SelectList
          // Placeholder text for the dropdown
          placeholder={data[0].value}
          // Disable search functionality
          search={false}
          // Set selected value callback
          setSelected={(val) => {
            const Break = val.split(" - "); // Split the selected value by "-"
            const start = parseInt(Break[0]); // Parse the start index
            const end = parseInt(Break[1]); // Parse the end index
            updateSelected([start, end]); // Call updateSelected with the new range
          }}
          // Styles for the dropdown text
          dropdownTextStyles={{ color: "white" }}
          // The data array for the dropdown
          data={data}
          // Save the selected value as the "value" property
          save="value"
          // Styles for the dropdown input
          inputStyles={{
            color: "white",
          }}
          // Styles for the dropdown box
          boxStyles={{
            paddingHorizontal: 10, // Add horizontal padding
            maxWidth: 150, // Set maximum width
            marginHorizontal: 10, // Add horizontal margin
            borderWidth: 0, // Remove border
            backgroundColor: "rgb(33,33,33)", // Set background color
            color: "white", // Set text color
          }}
          // Styles for the dropdown container
          dropdownStyles={{
            backgroundColor: "rgb(33,33,33)", // Set background color
            borderWidth: 0, // Remove border
            paddingHorizontal: 5, // Add horizontal padding
            maxWidth: 150, // Set maximum width
            marginHorizontal: 10, // Add horizontal margin
            color: "white", // Set text color
          }}
          // Custom arrow icon
          arrowicon={<Text style={{ paddingHorizontal: 5, color: "white" }}>↓</Text>}
        />
      </View>
      <Spacer /> {/* Spacer component for vertical spacing */}
    </>
  );
});

