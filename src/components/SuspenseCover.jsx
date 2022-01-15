import React from "react";
import styled from "styled-components";
import loadingSVG from "../assets/svg/loading.svg";

function SuspenseCover() {
  return (
    <Container>
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
  justify-content: center;
  align-items: center;
`;

const Loading = styled.img`
  width: 50%;
  max-width: 10rem;
`;

export default SuspenseCover;
