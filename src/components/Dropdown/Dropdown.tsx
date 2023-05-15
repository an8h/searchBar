/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from "react";
import { DropdownContainer, DropdownItem } from "./Dropdown.styled";
import Message from "../Message/Message";

type DropdownProps = {
  items: string[];
  onClickOption: (option: string) => void;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
};

function Dropdown({
  items,
  isLoading,
  error,
  onClickOption,
  searchTerm,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const loadingMsg = "Loading...";
  const errorMsg = "Cannot retrieve repos";
  const noResultsMsg = "No results found";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClickOption("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, onClickOption]);

  const ariaMessage = isLoading ? loadingMsg : error ? errorMsg : noResultsMsg;

  return (
    <DropdownContainer ref={dropdownRef} aria-live="polite">
      {!!(
        isLoading ||
        error ||
        (items.length === 0 && searchTerm.length > 0)
      ) && <Message message={ariaMessage} />}
      {!isLoading && !error && items.length > 0 && (
        <>
          {items.map((option) => (
            <DropdownItem
              key={option}
              onClick={() => onClickOption(option)}
              tabIndex={0}
              role="option"
            >
              {option}
            </DropdownItem>
          ))}
        </>
      )}
    </DropdownContainer>
  );
}

export default Dropdown;
