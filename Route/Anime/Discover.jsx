import { MainWrapper } from "../../Layout/MainWrapper";
import { SearchBar } from "../../Components/Anime/Discover/SearchBar";
import { HistoryDisplay } from "../../Components/Anime/Discover/HistoryDisplay";
import { addHistoryItem } from "../../LocalStorage/SearchHistory";
import { DisplaySearchResult } from "../../Components/Anime/Discover/DisplaySearchResult";
import { Spacer } from "../../Components/Global/Spacer";
import { useCallback, useEffect, useState } from "react";
import { getSearchAnime } from "../../Api/AnimeData";
import SimpleLoading from "../../Components/Global/Loading/SimpleLoading";
import { PaddingConatiner } from "../../Layout/PaddingConatiner";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Heading } from "../../Components/Global/Heading";

// Discover component is responsible for displaying the anime search functionality
// which includes the search bar, anime history, and search results.
export const Discover = ({navigation}) => {
  // state to control the visibility of search results
  const [showResults, setShowResults] = useState(false);
  // state to store the user's search query
  const [query, setQuery] = useState("");
  // state to store the API query for debouncing purposes
  const [ApiQuery, setApiQuery] = useState("");
  // state to control the loading spinner
  const [Loading, setLoading] = useState(false);
  // state to store the search results
  const [Results, setResults] = useState([]);

  // getSearchedResults is a callback function that fetches the search results
  // from the API based on the given query.
  const getSearchedResults = useCallback(
    async (text) => {
      if (text){
        try {
          setLoading(true)
          const Data = await  getSearchAnime(text);
          setShowResults(true)
          setResults(Data.results)
        } catch (e) {
          console.log(e + "error in search");
        } finally {
          setLoading(false)
        }
      }
    }, []);

  // initialSearchCall is a callback function that is called when the component
  // is mounted or when the API query changes. It adds the query to the history
  // and fetches the search results.
  const initialSearchCall = useCallback(
    async (term) => {
      if (term) {
        await addHistoryItem(term)
        await getSearchedResults(term)
      }
    },
    [],
  );

  // useEffect hook to call initialSearchCall when ApiQuery changes
  useEffect(() => {
    if (ApiQuery){
      initialSearchCall(ApiQuery)
    } else {
      setResults([])
      setShowResults(false)
    }
  }, [ApiQuery]);

  // useEffect hook to debounce the query state changes
  useEffect(() => {
    const timeoutId = setTimeout(()=>setApiQuery(query), 550)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [query]);

  // JSX to render the search bar, anime history, and search results
  return (
    <MainWrapper>
      <PaddingConatiner>
        <Animated.View entering={FadeInDown.delay(200)}>
          <Heading text={"What's in your mind"}/>
        </Animated.View>
        <Animated.View entering={FadeInDown}>
          <SearchBar onChangeText={(text)=>{
            setQuery(text)
          }} placeholder={"Search any anime"} showIcon={true} autoFocus={true}/>
        </Animated.View>
      </PaddingConatiner>
      {!Loading &&  <>
        {!showResults && <HistoryDisplay onHistoryTap={(text)=>{getSearchedResults(text)}}/>}
        <Spacer/>
        {showResults && ApiQuery && <DisplaySearchResult data={Results} navigation={navigation}/>}
      </>}
      {Loading && <SimpleLoading/>}
    </MainWrapper>
  );
};
