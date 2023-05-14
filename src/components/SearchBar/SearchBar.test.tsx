import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

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
    const input = screen.getByRole("textbox");
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
});
