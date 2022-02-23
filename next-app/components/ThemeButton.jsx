import styled from "styled-components";
import React from "react";
function ThemeButton() {
  const todark = (e) => {
    let now = localStorage.getItem("theme");
    if (now === "dark") {
      now = "light";
    } else if (now === "light") {
      now = "dark";
    } else {
      now = "dark";
    }
    window.document.querySelector("html").setAttribute("theme", now);
    localStorage.setItem("theme", now);
  };
  React.useEffect(() => {
    let now = localStorage.getItem("theme");
    window.document.querySelector("html").setAttribute("theme", now);
  }, []);
  return <Button onClick={todark}>主题切换</Button>;
}
const Button = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  border: none;
  box-shadow: var(--box-shadow);
  color: var(--color-color);
  padding: 0.5rem;
  background-color: var(--color-background-front);
`;
export default ThemeButton;
