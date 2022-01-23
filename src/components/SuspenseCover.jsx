import React from "react";
import styled from "styled-components";
import loadingSVG from "../assets/svg/loading.svg";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";

function SuspenseCover() {
  const theme = useSelector(selectTheme);
  return (
    <Container theme={theme}>
      <Loading src={loadingSVG}></Loading>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 9998;
  top: 0;
  ${(props) => {
    return props.theme.color
      ? `
    background-color:${props.theme.color.background}
  `
      : null;
  }}
`;

const Loading = styled.img`
  width: 50%;
  max-width: 10rem;
`;

export default SuspenseCover;
