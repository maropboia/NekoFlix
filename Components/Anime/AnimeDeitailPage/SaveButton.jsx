import { Pressable, StyleSheet } from "react-native";
import { SmallText } from "../../Global/SmallText";
import { memo, useCallback, useEffect, useState } from "react";
import {
  addToSavedAnime,
  isSavedAnime,
  removeSavedAnime
} from "../../../LocalStorage/SavedAnime";
import FontAwesome from "react-native-vector-icons/FontAwesome";

/**
 * A memoized SaveButton component that allows users to save an anime.
 * The component checks if the anime is already saved and updates its state accordingly.
 * @param {number} id - The unique identifier of the anime.
 * @param {object} data - The data of the anime to be saved.
 * @returns {JSX.Element} The SaveButton component.
 */
export const SaveButton = memo(({ id, data }) => {
  // Initialize the state variable isSaved to keep track of whether the anime is saved or not.
  const [isSaved, setIsSaved] = useState(false);

  // Define a useCallback hook to fetch whether the anime is saved or not.
  const saveAnime = useCallback(async () => {
    const issave = await isSavedAnime(id);
    setIsSaved(issave);
  }, []);

  // Execute the saveAnime function when the component mounts.
  useEffect(() => {
    saveAnime();
  }, []);

  // Define an onPress handler for the Pressable component that toggles the saved state of the anime.
  return (
    <Pressable
      onPress={async () => {
        if (isSaved) {
          setIsSaved(false);
          await removeSavedAnime(id);
        } else {
          setIsSaved(true);
          await addToSavedAnime(data);
        }
      }}
      style={{
        // Set the background color based on whether the anime is saved or not.
        backgroundColor: isSaved ? "rgb(164,41,41)" : "rgb(30,30,30)",
        width: 70,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5,
        padding: 10,
        margin: 10,
        flexDirection: "row",
        elevation: 10
      }}
    >
      {/* Render the text and icon for the SaveButton component. */}
      <SmallText
        text={isSaved ? "Saved" : "Save"}
        style={{ fontWeight: "bold" }}
      />
      <FontAwesome
        name={isSaved ? "bookmark" : "bookmark-o"}
        color={"white"}
      />
    </Pressable>
  );
});

