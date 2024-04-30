import AsyncStorage from '@react-native-async-storage/async-storage';

// This function retrieves the 'continueWatching' data from AsyncStorage
export async function getContinueWatching() {
  try {
    const value = await AsyncStorage.getItem('continueWatching'); // Retrieve the 'continueWatching' data from AsyncStorage
    if (value !== null) {
      return JSON.parse(value) // Parse the JSON string to a JavaScript object and return it
    } else {
      return [] // If no data is found, return an empty array
    }
  } catch (e) {
    console.warn("error in search history", e) // Log any errors that occur during the retrieval process
  }
}

// This function stores the 'continueWatching' data in AsyncStorage
export async function storeContinueWatching (value){
  try {
    await AsyncStorage.setItem('continueWatching', value); // Store the 'continueWatching' data in AsyncStorage
  } catch (e) {
    console.warn("error in saving search history", e) // Log any errors that occur during the storage process
 
