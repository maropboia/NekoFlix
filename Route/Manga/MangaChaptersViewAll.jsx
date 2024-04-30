import { MainWrapper } from "../../Layout/MainWrapper";
import { useCallback, useState } from "react";
import { ModalOption } from "../../Components/Manga/MangaChapterViewAll/ModalOption";
import { SearchAndHeading } from "../../Components/Manga/MangaChapterViewAll/SearchAndHeading";
import { ListChapters } from "../../Components/Manga/MangaChapterViewAll/ListChapters";

// MangaChaptersViewAll component receives a 'route' prop from its parent component
export const MangaChaptersViewAll = ({ route }) => {
  // Destructuring the 'data', 'image', 'id', 'slug', 'name', and 'imageId' properties from the 'route.params' object
  const { data, image, id, slug, name, imageId} = route.params
  // Declaring and initializing a state variable 'ModalVisible' to false using the 'useState' hook
  const [ModalVisible, setModalVisible] = useState(false);
  // Declaring and initializing a state variable 'Ascending' to true using the 'useState' hook
  const [Ascending, setAscending] = useState(true);
  // Declaring and initializing a state variable 'ChapterSearchText' to an empty string using the 'useState' hook
  const [ChapterSearchText, setChapterSearchText] = useState("");

  /*
  Declaring and initializing a callback function 'updateAscending' using the 'useCallback' hook
  This function takes a single argument 'value' and sets the 'Ascending' state to this value
  */
  const updateAscending = useCallback((value)=>setAscending(()=>value),[])

  /*
  Update 'ModalVisible' state with the new value
  Declaring and initializing a callback function 'updateModalVisible' using the 'useCallback' hook
  This function takes a single argument 'value' and sets the 'ModalVisible' state to this value
  */
  const updateAscending = useCallback((value)=>setAscending(()=>value),[])

  /*
  Update 'ChapterSearchText' state with the new value
  Declaring and initializing a callback function 'updateChapterSearchText' using the 'useCallback' hook
  This function takes a single argument 'value' and sets the 'ChapterSearchText' state to this value
  */
  const updateChapterSearchText = useCallback((value)=>setChapterSearchText(value),[])

  // JSX code to render the component
  return (
    <MainWrapper>
      {/* Passing 'ModalVisible', 'updateModalVisible', and 'updateChapterSearchText' as props to the 'ModalOption' component */}
      <ModalOption Ascending={Ascending} ModalVisible={ModalVisible} updateAscending={updateAscending} updateModalVisible={updateModalVisible}/>
      {/* Passing 'updateModalVisible' and 'updateChapterSearchText' as props to the 'SearchAndHeading' component */}
      <SearchAndHeading updateModalVisible={updateModalVisible}/>
      {/* Passing 'data', 'imageId', 'image', 'slug', 'id', 'name', 'Ascending', and 'ChapterSearchText' as props to the 'ListChapters' component */}
      <ListChapters data={data.reverse()} imageId={imageId} image={image} accending={Ascending} SearchText={ChapterSearchText} MangaSlug={slug} MangaId={id} name={name}/>
    </MainWrapper>
  );
};
