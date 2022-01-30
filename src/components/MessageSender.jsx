import React, { useState } from "react";
import styled from "styled-components";

function MessageSender(props) {
  const [input, setInput] = useState("");
  return (
    <Container theme={props.theme}>
      <form>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            props.send(input.toString());
            setInput("");
          }}
        >
          Send
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  background-color: ${(props) => props.theme.color.background};
  form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    input {
      height: 2.4rem;
      padding-left: 1rem;
      padding-right: 1rem;
      width: 50%;
      border-radius: 1.2rem;
      border: 1px solid var(--color-primary);
      outline: none;
      &:focus {
        outline-color: var(--color-primary);
      }
      background-color: ${(props) => props.theme.color.frontBackground};
      color: ${(props) => props.theme.color.color};
    }
    button {
      height: 2.5rem;
      border: 0;
      width: 23%;
      border-radius: 1.2rem;
      background-color: var(--color-primary);
      color: #fafafa;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      background: -webkit-linear-gradient(
        to right,
        #f1b533,
        #d84350
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to right,
        #f1b533,
        #d84350
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
  }
`;

export default MessageSender;
