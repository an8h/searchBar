import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: absolute;
  top: calc(25% + 5px);
  width: 70%;
  max-width: 50rem;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;

  @media (max-width: 768px) {
    max-width: 40rem;
  }

  @media (max-width: 480px) {
    max-width: 30rem;
  }
`;

export const DropdownItem = styled.div`
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;
