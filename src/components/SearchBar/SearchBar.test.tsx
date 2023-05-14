import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders the search bar with a placeholder", () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText("Search");
    expect(inputElement).toBeInTheDocument();
  });

  // it("calls the onSearch function when the form is submitted", () => {
  //   const onSearch = jest.fn();
  //   render(<SearchBar onSearch={onSearch} />);
  //   const inputElement = screen.getByPlaceholderText("Search");
  //   const searchTerm = "test";
  //   fireEvent.change(inputElement, { target: { value: searchTerm } });
  //   fireEvent.submit(screen.getByRole("search"));
  //   expect(onSearch).toHaveBeenCalledWith(searchTerm);
  // });
  it("should call onSearch with the search term when the form is submitted", async () => {
    // render(<SearchBar onSearch={() => {}} />);
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Search");
    const form = screen.getByRole("search");
    // const form = screen.getByRole("form");
    const searchTerm = "test";

    fireEvent.change(input, { target: { value: searchTerm } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith(searchTerm);
    });
  });
});
