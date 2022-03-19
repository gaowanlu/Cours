import React from "react";
import styled from "styled-components";

function RequireForm() {
  const submitEvent = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Form>
        <TextArea placeholder={"请输入内容"} />
        <Button type="submit" onClick={submitEvent}>
          Messager
        </Button>
      </Form>
    </>
  );
}

const Form = styled.form``;
const TextArea = styled.textarea`
  width: 100%;
  height: 40vh;
  border: none;
  resize: none;
  border-radius: 0.5rem;
  box-sizing: border-box;
  padding: 0.5rem;
  background-color: var(--color-background);
  color: var(--color-color);
`;
const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  font-size: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  color: #fafafa;
  background-color: var(--color-primary);
  border-radius: 0.5rem;
  border: none;
  margin-top: 1rem;
`;
export default RequireForm;
