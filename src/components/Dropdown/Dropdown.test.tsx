import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  const items = ["Option 1", "Option 2", "Option 3"];
  const onClickOptionMock = jest.fn();
  const loadingMsg = "Loading...";
  const errorMsg = "Cannot retrieve repos";
  const noResultsMsg = "No results found";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading message when isLoading prop is true", () => {
    render(
      <Dropdown
        items={items}
        onClickOption={onClickOptionMock}
        isLoading
        error={null}
        searchTerm=""
      />,
    );

    expect(screen.getByText(loadingMsg)).toBeInTheDocument();
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
    expect(screen.queryByText(noResultsMsg)).not.toBeInTheDocument();
  });

  it("renders error message when error prop is not null", () => {
    render(
      <Dropdown
        items={items}
        onClickOption={onClickOptionMock}
        isLoading={false}
        error="Something went wrong"
        searchTerm=""
      />,
    );

    expect(screen.getByText(errorMsg)).toBeInTheDocument();
    expect(screen.queryByText(loadingMsg)).not.toBeInTheDocument();
    expect(screen.queryByText(noResultsMsg)).not.toBeInTheDocument();
  });

  it("renders no results message when items length is 0 and searchTerm length is greater than 0", () => {
    render(
      <Dropdown
        items={[]}
        onClickOption={onClickOptionMock}
        isLoading={false}
        error={null}
        searchTerm="test"
      />,
    );

    expect(screen.getByText(noResultsMsg)).toBeInTheDocument();
    expect(screen.queryByText(loadingMsg)).not.toBeInTheDocument();
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });

  it("renders dropdown items when items length is greater than 0", () => {
    render(
      <Dropdown
        items={items}
        onClickOption={onClickOptionMock}
        isLoading={false}
        error={null}
        searchTerm=""
      />,
    );

    const dropdownItems = screen.getAllByRole("option");
    expect(dropdownItems.length).toBe(items.length);

    dropdownItems.forEach((item, index) => {
      expect(item).toHaveTextContent(items[index]);
    });
  });
  it("calls onClickOption callback when a dropdown item is clicked", () => {
    render(
      <Dropdown
        items={items}
        onClickOption={onClickOptionMock}
        isLoading={false}
        error={null}
        searchTerm=""
      />,
    );

    const dropdownItems = screen.getAllByRole("option");

    dropdownItems.forEach((item, index) => {
      userEvent.click(item);
      expect(onClickOptionMock).toHaveBeenCalledWith(items[index]);
    });
  });

  it("calls onClickOption callback with empty string when clicked outside the dropdown container", () => {
    render(
      <div>
        <Dropdown
          items={items}
          onClickOption={onClickOptionMock}
          isLoading={false}
          error={null}
          searchTerm=""
        />
        <button type="button">Outside Button</button>
      </div>,
    );

    const outsideButton = screen.getByText("Outside Button");
    userEvent.click(outsideButton);

    expect(onClickOptionMock).toHaveBeenCalledWith("");
  });
});
