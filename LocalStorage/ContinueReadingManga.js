// Import AsyncStorage from '@react-native-async-storage/async-storage' to store and access data asynchronously in your React Native app.
import AsyncStorage from '@react-native-async-storage/async-storage';

// This function retrieves the 'continueReading' data from AsyncStorage.
// If the data exists, it parses the JSON string and returns the array.
// If the data doesn't exist, it returns an empty array.
export async function getContinueReading() {
  try {
    const value = await AsyncStorage.getItem('continueReading');
    if (value !== null) {
      return JSON.parse(value); // Parse the JSON string to an array
    } else {
      return []; // Return an empty array if no data is found
    }
  } catch (e) {
    console.warn("error in search history", e);
  }
}

// This function stores the 'continueReading' data in AsyncStorage as a JSON string.
export async function storeContinueReading(value) {
  try {
    await AsyncStorage.setItem('continueReading', JSON.stringify(value)); // Stringify the array to a JSON string before storing
  } catch (e) {
    console.warn("error in saving search history", e);
  }
}

// This function removes the 'continueReading' data from AsyncStorage.
export async function clearContinueReading() {
  try {
    await AsyncStorage.removeItem('continueReading');
  } catch (e) {
    console.warn("error in clearing search history", e);
  }
}

// This function removes a specific value from the 'continueReading' data in AsyncStorage.
// It first retrieves the data, filters out the value to be removed, and then stores the updated data.
export async function removeContinueReading(value) {
  try {
    const data = await getContinueReading();
    const newData = data.filter((item) => item !== value);
    await storeContinueReading(JSON.stringify(newData));
  } catch (e) {
    console.warn("error in removing search history", e);
  }
}

// This function adds a new value to the 'continueReading' data in AsyncStorage.
// It first retrieves the data, checks if the value already exists, and updates the data accordingly.
// If the data length exceeds 21, it removes the last item before adding the new value.
export async function addToContinueReading(value) {
  try {
    const data = await getContinueReading();
    let include = false;
    data.forEach((item) => {
      if (item.id === value.id) {
        include = true;
      }
    });
    if (include) {
      const newData = data.filter((item) => item.id !== value.id);
      newData.unshift(value);
      await storeContinueReading(JSON.stringify(newData));
    } else if (data.length > 21) {
      data.pop();
      data.unshift(value);
      await storeContinueReading(JSON.stringify(data));
    } else {
      data.unshift(value);
      await storeContinueReading(JSON.stringify(data));
    }
  } catch (e) {
    console.warn("error in adding search history", e);
  }
}
