import { MainWrapper } from "../../Layout/MainWrapper";
import { SearchBar } from "../../Components/Anime/Discover/SearchBar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { PaddingConatiner } from "../../Layout/PaddingConatiner";
import { useCallback, useEffect, useState } from "react";
import { GetSearchManga } from "../../Api/MangaData";
import { FullScreenLoading } from "../../Components/Manga/Loading/FullScreenLoading";
import { Spacer } from "../../Components/Global/Spacer";
import { EachMangaCard } from "../../Components/Manga/EachMangaCard";
import { Dimensions, FlatList } from "react-native";

/**
 * SearchPageManga component is responsible for rendering the search page for manga.
 * It includes a search bar for user input, displays search results, and handles API calls.
 */
export const SearchPageManga = () => {
  // Get window width to calculate margin for EachMangaCard component
  const width = Dimensions.get("window").width;
  // State to store search results
  const [SearchResult, setSearchResult] = useState([]);
  // State to store user's search query
  const [query, setQuery] = useState("");
  // State to store the API query for debouncing
  const [ApiQuery, setApiQuery] = useState("");
  // State to control the loading spinner
  const [Loading, setLoading] = useState(false);

  /**
   * fetchSearchResults is a callback function that fetches search results from the API.
   * @param {string} term - The search query to be used in the API call.
   */
  const getSearchResult = useCallback(
    async (term) => {
      try {
        setLoading(true);
        const result = await GetSearchManga(term); // Call the API
        console.log(result);
        setSearchResult(result.data); // Update the search results state
      } catch (e) {
        console.log("error in getting search result");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Fetch search results when the API query changes
  useEffect(() => {
    if (ApiQuery) {
      getSearchResult(ApiQuery);
    } else {
      setSearchResult([]);
    }
  }, [ApiQuery]);

  // Debounce the user's query input
  useEffect(() => {
    const timeoutId = setTimeout(() => setApiQuery(query), 450);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <MainWrapper>
      <PaddingConatiner>
        <Animated.View entering={FadeInDown}>
          {/* Render the SearchBar component */}
          <SearchBar
            showIcon={true}
            placeholder={"Search for manga"}
            autoFocus={true}
            onChangeText={(text) => {
              setQuery(text);
            }}
          />
        </Animated.View>
      </PaddingConatiner>
      <Spacer />
      {/* Conditionally render the loading spinner or the search results */}
      {Loading && <FullScreenLoading />}
      {!Loading && (
        <PaddingConatiner>
          <FlatList
            numColumns={3}
            showsVerticalScrollIndicator={false}
            data={SearchResult}
            // Add margin to EachMangaCard components
            contentContainerStyle={{ justifyContent: "center", gap: 2, paddingBottom: 80 }}
            renderItem={({ item, index }) => {
              if (index < 20) {
                // FadeInDown animation for the first 20 EachMangaCard components
                return (
                  <Animated.View
                    entering={FadeInDown.delay((index < 20) ? (index * 40) : (0))}
                    style={{ marginHorizontal: width / 90 }}
                  >
                    <EachMangaCard
                      key={index}
                      id={item.id}
                      image={item.cover}
                      slug={item.slug}
                      name={item.title}
                    />
                  </Animated.View>
                );
              } else {
                // Render EachMangaCard components without animation for index > 20
                return (
                  <EachMangaCard
                    key={index}
                    id={item.id}
                    image={item.cover}
                    slug={item.slug}
                    name={item.title}
                  />
                );
              }
            }}
          />
        </PaddingConatiner>
      )}
    </MainWrapper>
  );
};

