import React from "react";
import styled from "styled-components";

type MessageProps = {
  message: string;
};

const MessageContainer = styled.p`
  padding-left: 0.7rem;
`;

function Message({ message }: MessageProps) {
  return <MessageContainer>{message}</MessageContainer>;
}

export default Message;
