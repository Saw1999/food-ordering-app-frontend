import { useParams } from "react-router-dom"
import { useSearchRestaurants } from "../api/RestaApi";
import { SearchRestaInfo } from "../components/SearchRestaInfo";
import { SearchResultCard } from "../components/SearchResultCard";
import { useState } from "react";
import { SearchBox, SearchForm } from "../components/SearchBox";
import { PaginationSelector } from "../components/PaginationSelector";
import { DishesFilter } from "../components/DishesFilter";
import { SortOptionDropDown } from "../components/SortOptionDropDown";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedDishes: string[];
  sortOption: string;
};


export const Search = () => {
  const {city} = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedDishes: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const {searchResults, isLoading} = useSearchRestaurants(searchState, city);


  const setSearchQuery= (searchFormData: SearchForm) =>{
    setSearchState((prevState)=>({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };


  const resetSearch = () =>{
    setSearchState((prevState)=>({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSelectedDishes = (selectedDishes: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedDishes,
      page: 1,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  if(isLoading){
    <span>...Loading</span>
  }

  if(!searchResults?.data || !city){
    return <span>No results found</span>
  }
    
  return (
    <div className="grid gap-5 grid-cols-1 lg:grid-cols-[250px_1fr]">
      
      <div id="dishes-list">
        <DishesFilter 
        selectedDishes={searchState.selectedDishes}
        onChange={setSelectedDishes}
        isExpanded={isExpanded}
        onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
        />
      </div>

      <div id="main-content" className="flex flex-col gap-5">
        <SearchBox 
        onSubmit={setSearchQuery} 
        placeholder="Search by dishes or restaurant name" 
        onReset={resetSearch}
        searchQuery={searchState.searchQuery} 
        />

        <div className="flex flex-col gap-3 justify-between lg:flex-row">
          <SearchRestaInfo totalResta={searchResults.pagination.totalResta} city={city} />
          <SortOptionDropDown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)}/>
        </div>

        {searchResults.data.map((restaurant, index) => (
          <SearchResultCard key={index} restaurant={restaurant}/>
        ))}

        <PaginationSelector 
        page={searchResults.pagination.page} 
        pages={searchResults.pagination.pages} 
        onPageChange={setPage}
        />

      </div>

    </div>
  )
}
