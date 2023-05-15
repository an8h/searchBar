import { SearchResult } from "../types/types";

type SearchResultsCache = {
  [searchTerm: string]: SearchResult[];
};

const searchResultsCache: SearchResultsCache = {};

const API_URL = "https://api.github.com/search/repositories";

const CACHE_EXPIRATION_TIME = 600000; // 10 minutes

const getSearchResults = async (
  searchTerm: string,
): Promise<SearchResult[]> => {
  if (searchResultsCache[searchTerm]) {
    return searchResultsCache[searchTerm];
  }

  const cachedData = sessionStorage.getItem(searchTerm);
  if (cachedData) {
    const { timestamp, results } = JSON.parse(cachedData);
    if (Date.now() - timestamp <= CACHE_EXPIRATION_TIME) {
      searchResultsCache[searchTerm] = results;
      return results;
    }
  }

  const response = await fetch(
    `${API_URL}?q=${encodeURIComponent(searchTerm)}`,
  );
  if (!response.ok) {
    throw new Error(
      `Error fetching search results: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  const results: SearchResult[] = data.items.map((item: any) => ({
    id: item.id,
    title: item.full_name,
    description: item.description,
    url: item.html_url,
  }));

  searchResultsCache[searchTerm] = results;

  const cacheData = {
    timestamp: Date.now(),
    results,
  };

  sessionStorage.setItem(searchTerm, JSON.stringify(cacheData));

  return results;
};

export default getSearchResults;
