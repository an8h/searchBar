import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import {
  SearchBarContainer,
  Form,
  InputWrapper,
  Input,
  SearchIconWrapper,
  ClearIconWrapper,
} from "./SearchBar.styled";
import { SearchResult } from "../../types/types";
import getSearchResults from "../../api/SearchService";
import useDebounce from "../../hooks/useDebounce";
import Dropdown from "../Dropdown/Dropdown";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        const results = await getSearchResults(debouncedSearchTerm);
        setSearchResults(results);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
        setError("Failed to get search suggestions.");
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedSearchTerm = searchTerm
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/gi, "");
    onSearch(sanitizedSearchTerm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = useCallback(() => {
    setSearchTerm("");
    setSearchResults([]);
  }, []);

  const clearIcon = useMemo(
    () => (
      <ClearIconWrapper onClick={handleClear} role="button">
        <LazyLoadComponent>
          <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
        </LazyLoadComponent>
      </ClearIconWrapper>
    ),
    [handleClear],
  );

  const searchIcon = useMemo(
    () => (
      <SearchIconWrapper>
        <LazyLoadComponent>
          <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
        </LazyLoadComponent>
      </SearchIconWrapper>
    ),
    [],
  );

  return (
    <SearchBarContainer>
      <Form role="search" onSubmit={handleSearch}>
        <InputWrapper active={!!searchTerm}>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
            aria-label="Search"
          />
          {searchTerm && clearIcon}
          {searchIcon}
        </InputWrapper>
      </Form>
      {searchResults && (
        <Dropdown
          items={searchResults.map((result) => result.title)}
          isLoading={isLoading}
          error={error}
          searchTerm={debouncedSearchTerm}
          onClickOption={(item: string) => {
            setSearchTerm(item);
            setSearchResults([]);
            onSearch(item);
          }}
        />
      )}
    </SearchBarContainer>
  );
}

export default SearchBar;
