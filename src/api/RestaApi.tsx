import { useQuery } from "react-query";
import { RestaurantSearchResponse } from "../types";
import { SearchState } from "../pages/Search";

const APT_BASE_URL = import.meta.env.VITE_API_BASE_URL // api url of our backend

// creating custom useSearchRestaurants hook
export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
    const createSearchRequest = async(): Promise<RestaurantSearchResponse> => {
        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);
        params.set("page", searchState.page.toString());
        params.set("selectedDishes", searchState.selectedDishes.join(","));
        params.set("sortOption", searchState.sortOption);

        const res = await fetch(`${APT_BASE_URL}/api/restaurants/search/${city}?${params.toString()}`);

        if(!res.ok) {
            throw new Error("Something went wrong while fetching restaurants!")
        }

        return res.json();
    };

    const {data: searchResults, isLoading} = useQuery(["searchRestaurants", searchState], createSearchRequest, {enabled:!!city});

    return {searchResults, isLoading};
};
