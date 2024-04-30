import { Home } from "./Home"; // Importing the Home component
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Importing the createNativeStackNavigator function
import { AnimeDetailPage } from "./AnimeDetailPage"; // Importing the AnimeDetailPage component
import EachCharactersDetails from "./EachCharactersDetailsPage"; // Importing the EachCharactersDetails component
import { ViewAllSectionsAnime } from "./ViewAllSections"; // Importing the ViewAllSectionsAnime component
import { Discover } from "./Discover"; // Importing the Discover component

// Creating a new instance of the native stack navigator
const Stack = createNativeStackNavigator();

// Defining the HomeRoute component which returns a navigator with several screens
export const HomeRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hiding the header for all screens in this navigator
        animation: "ios", // Setting the animation style to 'ios'
      }}
    >
      {/* Defining a screen with the name 'HomePage' that uses the Home component */}
      <Stack.Screen name="HomePage" component={Home} />
      {/* Defining a screen with the name 'AnimeDetail' that uses the AnimeDetailPage component */}
      <Stack.Screen name="AnimeDetail" component={AnimeDetailPage} />
      {/* Defining a screen with the name 'EachCharactersDetails' that uses the EachCharactersDetails component */}
      <Stack.Screen name="EachCharactersDetails" component={EachCharactersDetails} />
      {/* Defining a screen with the name 'ViewAllAnimeSection' that uses the ViewAllSectionsAnime component */}
      <Stack.Screen name="ViewAllAnimeSection" component={ViewAllSectionsAnime} />
      {/* Defining a screen with the name 'DiscoverPage' that uses the Discover component */}
      <Stack.Screen name="DiscoverPage" component={Discover} />
    </Stack.Navigator>
  );
};
