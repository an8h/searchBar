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

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = useCallback(() => {
    setSearchTerm("");
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
    </SearchBarContainer>
  );
}

export default SearchBar;
