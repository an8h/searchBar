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

  return (
    <DropdownContainer ref={dropdownRef}>
      {isLoading && <Message message={loadingMsg} />}
      {error && <Message message={errorMsg} />}
      {!isLoading && !error && items.length === 0 && searchTerm.length > 0 && (
        <Message message={noResultsMsg} />
      )}
      {!isLoading && !error && items.length > 0 && (
        <>
          {items.map((option) => (
            <DropdownItem key={option} onClick={() => onClickOption(option)}>
              {option}
            </DropdownItem>
          ))}
        </>
      )}
    </DropdownContainer>
  );
}

export default Dropdown;
