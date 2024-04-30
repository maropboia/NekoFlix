import { Button, Dimensions, View } from "react-native";
import { MainWrapper } from "../../Layout/MainWrapper";
import { WebView } from 'react-native-webview';
import { PlainText } from "../../Components/Global/PlainText";
import { useTheme } from "@react-navigation/native";
import { GetMangaChapterPages } from "../../Api/MangaData";
import { useEffect, useState } from "react";
import { FormatMangaLinks } from "../../Utils/FormatMangaLinks";
import SimpleLoading from "../../Components/Global/Loading/SimpleLoading";
import { setMangaCurrentReadingChapter } from "../../LocalStorage/EachMangaChaptersStatus";
import { addToContinueReading } from "../../LocalStorage/ContinueReadingManga";

/**
 * MangaChaptersViewer component displays the selected manga chapter using WebView.
 * It fetches chapter pages, handles navigation between chapters, and updates
 * the current reading chapter and continue reading list.
 *
 * @param {Object} route - Route parameters containing manga and chapter info.
 * @returns {JSX.Element} MangaChaptersViewer component.
 */
export const MangaChaptersViewer = ({route}) => {
  // Extract manga and chapter info from route parameters
  const {id, slug, MangaSlug, MangaId, name, image} = route.params;
  const [mangaAndChapterInfo, setMangaAndChapterInfo] = useState({id, slug, MangaSlug, MangaId});
  const [Loading, setLoading] = useState(true); // Loading state for chapter pages
  const [Pagesdata, setPagesData] = useState({}); // State to store chapter pages data
  const theme = useTheme() // Theme context for styling
  const { width, height } = Dimensions.get("window"); // Screen dimensions

  /**
   * fetchChapterPages - Fetches chapter pages data from the API.
   */
  const getMangaChapterPages = async () => {
    try {
      setLoading(true)
      const data = await GetMangaChapterPages(mangaAndChapterInfo.MangaId,mangaAndChapterInfo.MangaSlug,mangaAndChapterInfo.id,mangaAndChapterInfo.slug)
      setPagesData(data)
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }

  /**
   * updateMangaAndChapterInfo - Updates the manga and chapter info state and
   * saves the current reading chapter in local storage.
   *
   * @param {number} id - Chapter ID.
   * @param {string} slug - Chapter slug.
   */
  const updateMangaAndChapterInfo = async (id, slug) => {
    const temp = {}
    temp.MangaId = mangaAndChapterInfo.MangaId
    temp.MangaSlug = mangaAndChapterInfo.MangaSlug
    temp.id = id
    temp.slug = slug
    await setMangaCurrentReadingChapter(mangaAndChapterInfo.MangaId,id,mangaAndChapterInfo.MangaSlug,slug)
    setMangaAndChapterInfo(temp)
  }

  /**
   * finalHtml - Generates the HTML string for displaying chapter pages in WebView.
   *
   * @returns {string} HTML string.
   */
  function finalHtml() {
    const pages = Pagesdata?.chapter?.images.map((e)=>FormatMangaLinks.getMangaPageLink(mangaAndChapterInfo.MangaId,mangaAndChapterInfo.slug,e))
    let initialString = "<html>"
    pages.map((e)=>{
      initialString += `<img src=${e} style='max-width: 100%;'>`
    })
    initialString += "</html>"
    return initialString
  }

  /**
   * updateContinueReading - Adds the current manga to the continue reading list
   * in local storage.
   */
  async function updateContinueReading(){
    await addToContinueReading({id:MangaId, slug:MangaSlug, name, image})
  }

  // Fetch chapter pages when the component mounts
  useEffect(() => {
    getMangaChapterPages()
  }, [mangaAndChapterInfo]);

  // Add the current manga to the continue reading list when the component mounts
  useEffect(() => {
    updateContinueReading()
  }, []);

  return (
    <MainWrapper>
      {!Loading && <WebView scrollEnabled={true} decelerationRate={1} source={{ html: finalHtml()}} style={{ flex: 1 }} />}
      {Loading && <SimpleLoading containerStyle={{flex:1}}/>}
     <View style={{
        backgroundColor: "rgba(18,17,17,0.79)",
        bottom: 0,
        width:width,
        padding:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
      }}>
        <Button color={theme.colors.primary} title={"Next"} onPress={()=>{
          updateMangaAndChapterInfo(Pagesdata?.next_chapter?.id, Pagesdata?.next_chapter?.slug)
        }}  disabled={Loading || !Pagesdata?.next_chapter}/>
        <PlainText text={"Chapter " + Pagesdata?.chapter?.chapter_number} style={{fontWeight:"bold"}}/>
        <Button color={theme.colors.primary}  title={"Prev"} onPress={()=>{
          updateMangaAndChapterInfo(Pagesdata?.prev_chapter?.id, Pagesdata?.prev_chapter?.slug)
        }}  disabled={Loading || !Pagesdata?.prev_chapter}/>
      </View>
    </MainWrapper>
  );
};
