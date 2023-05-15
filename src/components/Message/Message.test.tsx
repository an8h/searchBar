import { render, screen } from "@testing-library/react";
import Message from "./Message";

it("renders the message correctly", () => {
  const message = "This is a test message";
  render(<Message message={message} />);

  const messageElement = screen.getByText(message);
  expect(messageElement).toBeInTheDocument();
});
