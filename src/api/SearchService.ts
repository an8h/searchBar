import { SearchResult } from "../types/types";

type SearchResultsCache = {
  [searchTerm: string]: SearchResult[];
};

const searchResultsCache: SearchResultsCache = {};

const API_URL = "https://api.github.com/search/repositories";

const getSearchResults = async (
  searchTerm: string,
): Promise<SearchResult[]> => {
  if (searchResultsCache[searchTerm]) {
    return searchResultsCache[searchTerm];
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

  return results;
};

export default getSearchResults;
