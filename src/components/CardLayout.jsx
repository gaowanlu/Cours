import React from "react";
import styled from "styled-components";

function CardLayout(props) {
  return <Card theme={props.theme}>{props.children}</Card>;
}

const Card = styled.section`
  box-sizing: border-box;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0px 0px 10px 2px #97969628;
  ${(props) => {
    return props.theme.color
      ? `
      background-color: ${props.theme.color.frontBackground};
  `
      : null;
  }}
  ${(props) => {
    return props.theme.box
      ? `
      box-shadow: ${props.theme.box.boxShadow};
  `
      : null;
  }}
`;

export default CardLayout;
