import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import {
  SearchBarContainer,
  Form,
  InputWrapper,
  Input,
  SearchIconWrapper,
} from "./SearchBar.styled";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <SearchBarContainer>
      <Form role="search" onSubmit={handleSearch}>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            aria-label="Search"
          />
          <SearchIconWrapper>
            <LazyLoadComponent>
              <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
            </LazyLoadComponent>
          </SearchIconWrapper>
        </InputWrapper>
      </Form>
    </SearchBarContainer>
  );
}

export default SearchBar;
