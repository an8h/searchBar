import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import * as SearchService from "../../api/SearchService";
import { SearchResult } from "../../types/types";

jest.mock("../../api/SearchService");

describe("SearchBar", () => {
  const onSearchMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<SearchBar onSearch={onSearchMock} />);
  });

  it("renders the search bar with a placeholder", () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText("Search");
    expect(inputElement).toBeInTheDocument();
  });

  it("should call onSearch prop when submit form", () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const form = screen.getByRole("search");
    const input = screen.getByRole("combobox");
    const searchTerm = "example";

    fireEvent.change(input, { target: { value: searchTerm } });
    fireEvent.submit(form);

    expect(onSearchMock).toHaveBeenCalledWith(searchTerm);
  });

  it("should clear the input when clear icon is clicked", () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByLabelText("Search");
    const searchTerm = "test";
    fireEvent.change(input, { target: { value: searchTerm } });
    expect(input).toHaveValue(searchTerm);

    const clearIcon = screen.getByRole("button");

    fireEvent.click(clearIcon);
    expect(input).toHaveValue("");
  });

  it("should focus the input on mount", () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByLabelText("Search");

    expect(input).toHaveFocus();
  });

  it("retrieves data when given a search query equal to or longer than 2 characters", async () => {
    const searchResults: SearchResult[] = [
      { id: 1, title: "result1", description: "Description 1", url: "url1" },
      { id: 2, title: "result2", description: "Description 2", url: "url2" },
    ];
    jest.spyOn(SearchService, "default").mockResolvedValue(searchResults);

    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByLabelText("Search");

    fireEvent.change(input, { target: { value: "query" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await screen.findByText("result1");
    expect(screen.getByText("result1")).toBeInTheDocument();
    expect(screen.getByText("result2")).toBeInTheDocument();
  });

  it("displays search results in a list when data is retrieved successfully", async () => {
    const mockResults: SearchResult[] = [
      { id: 1, title: "result1", description: "Description 1", url: "url1" },
      { id: 2, title: "result2", description: "Description 2", url: "url2" },
      { id: 3, title: "result3", description: "Description 3", url: "url3" },
    ];
    jest.spyOn(SearchService, "default").mockResolvedValue(mockResults);

    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByLabelText("Search");

    fireEvent.change(input, { target: { value: "valid input" } });
    fireEvent.submit(screen.getByRole("search"));

    await screen.findByText("result1");
    expect(screen.getByText("result1")).toBeInTheDocument();
    expect(screen.getByText("result2")).toBeInTheDocument();
    expect(screen.getByText("result3")).toBeInTheDocument();
  });
});
