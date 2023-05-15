type SearchResult = {
  id: number;
  title: string;
  description: string;
  url: string;
};

interface SearchResultWithHighlight extends SearchResult {
  highlightedText: string;
}

export type { SearchResult, SearchResultWithHighlight };
