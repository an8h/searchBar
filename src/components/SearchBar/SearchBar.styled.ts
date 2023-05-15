import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  height: 100vh;
  /* background-color: #067; */
  position: relative;
`;

export const Form = styled.form`
  width: 70%;
  max-width: 50rem;
  padding-top: 10rem;

  @media (max-width: 768px) {
    max-width: 40rem;
  }

  @media (max-width: 480px) {
    max-width: 30rem;
  }
`;

type InputWrapperProps = {
  active: boolean;
};

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  position: relative;
  border: 2px solid
    ${({ theme, active }) => (active ? theme.primary : theme.border)};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};
  transition: all 0.3s ease;
  &:focus-within {
    box-shadow: 0px 0px 4px ${({ theme }) => theme.primary};
    border: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  margin-right: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const SearchIconWrapper = styled.i`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  color: #666;
  font-size: 1.2rem;
  padding-right: 0.5rem;
`;

export const ClearIconWrapper = styled.i`
  cursor: pointer;
  position: absolute;
  right: 2.5rem;
  font-size: 1.6rem;
  margin-right: 0.5rem;
`;
