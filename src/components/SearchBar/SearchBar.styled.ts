import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  padding: 0 20px;
  height: 100vh;
  /* background-color: #067; */
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

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 25px;
  background-color: #f2f2f2;
  padding: 0.5rem;
  position: relative;
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
