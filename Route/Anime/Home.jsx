import { MainWrapper } from "../../Layout/MainWrapper";
import Crousel from "../../Components/Anime/Home/TopCrousel/Crousel";
import { ScrollView, View } from "react-native";
import { Spacer } from "../../Components/Global/Spacer";
import { Sections } from "../../Components/Anime/Home/Sections/Sections";
import { useCallback, useContext, useEffect, useState } from "react";
import { getContinueWatching } from "../../LocalStorage/ContinueWatching";
import Context from "../../GlobalState/Context";
import { SearchBar } from "../../Components/Anime/Discover/SearchBar";
import { PaddingConatiner } from "../../Layout/PaddingConatiner";
import { Heading } from "../../Components/Global/Heading";
import { SpaceBetween } from "../../Layout/SpaceBetween";
import LinearGradient from "react-native-linear-gradient";

// Home component with navigation as a prop
export const Home = ({ navigation }) => {
  // Destructuring required data from the context
  const {
    TrendingLoading,
    PopularLoading,
    AirngLoading,
    Trending,
    Popular,
    Airing,
  } = useContext(Context);

  // State for continue watching loading and data
  const [ContinueWatchingLoading, setContinueWatchingLoading] = useState(true);
  const [ContinueWatching, setContinueWatching] = useState([]);

  // Callback for fetching continue watching data
  const GetContinueWatching = useCallback(async function GetContinueWatching() {
    try {
      const data = await getContinueWatching();
      setContinueWatching(data);
    } catch (e) {
      console.warn("Error in getting Continue Watching Anime", e);
    } finally {
      setContinueWatchingLoading(false);
    }
  }, []);

  // Effect to fetch continue watching data on mount
  useEffect(() => {
    GetContinueWatching();
  }, [GetContinueWatching]);

  // JSX for rendering the Home screen
  return (
    <MainWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Linear gradient with a search bar */}
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={[
            "rgba(0,0,0,0.07)",
            "rgba(0,0,0,0.2)",
            "rgba(0,0,0,0.72)",
            "black",
          ]}
          style={{
            position: "absolute",
            zIndex: 100,
            backgroundColor: "rgba(16,15,15,0)",
            justifyContent: "center",
            paddingVertical: 5,
            paddingHorizontal: 10,
            width: "100%",
          }}
        >
          {/* Anime heading */}
          <Heading text={"Anime"} />
          {/* Search bar for anime */}
          <SearchBar
            isInverted={false}
            isTemplate={true}
            onPressTemplate={() => {
              navigation.navigate("DiscoverPage");
            }}
            placeholder={"Search Anime"}
            showIcon={true}
          />
        </LinearGradient>
        {/* Carousel for popular anime */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Crousel isLoading={PopularLoading} Data={Popular.slice(0, 4)} />
        </View>
        {/* Conditional rendering of continue watching section */}
        {ContinueWatching.length > 0 && (
          <>
            <Sections
              results={ContinueWatching}
              title={"Continue Watching"}
              isLoading={ContinueWatchingLoading}
              navigation={navigation}
            />
            <Spacer />
            <Spacer />
          </>
        )}
        {/* Section for most popular anime */}
        <Sections
          results={Popular.slice(4, Popular.length + 1)}
          title={"Most Popular"}
          isLoading={PopularLoading}
          navigation={navigation}
        />
        <Spacer />
        <Spacer />
        {/* Section for trending anime */}
        <Sections
          results={Trending}
          title={"Trending Anime"}
          isLoading={TrendingLoading}
          navigation={navigation}
        />
        <Spacer />
        <Spacer />
        {/* Section for top airing anime */}
        <Sections
          results={Airing}
          title={"Top Airing"}
          isLoading={AirngLoading}
          navigation={navigation}
        />
      </ScrollView>
    </MainWrapper>
  );
};

