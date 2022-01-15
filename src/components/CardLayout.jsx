import React from "react";
import styled from "styled-components";

function CardLayout(props) {
  return <Card>{props.children}</Card>;
}

const Card = styled.section`
  box-sizing: border-box;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0px 0px 10px 2px #97969628;
`;

export default CardLayout;
