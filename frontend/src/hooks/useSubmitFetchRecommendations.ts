import {useGetRecommendations} from "./useGetRecommendations.ts";

export function useSubmitFetchRecommendations() {
    const getRecommendations = useGetRecommendations();

    return async() => {
        await getRecommendations.fetchRecommendations();
    };
}