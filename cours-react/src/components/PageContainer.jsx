import React from "react";
import styled from "styled-components";

/*页面root container*/
function PageContainer(props) {
  return <Container {...props}>{props.children}</Container>;
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f2f2f6;
  color: #1d1d1f;
  box-sizing: border-box;
  padding: 0.7rem;
  padding-top: 2rem;
  background-color: var(--color-background);
  color: var(--color-color);
`;

export default PageContainer;
