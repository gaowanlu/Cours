import React from "react";
import styled from "styled-components";

/**
 *
 * @param {size:0 or 1 or 2 or 3,title,color} props
 * @returns
 */
function PageHeader(props) {
  return (
    <Header {...props}>
      <p>{props.title}</p>
    </Header>
  );
}

const Header = styled.div`
  margin-bottom: 1.5rem;
  p {
    font-size: 2rem;
    font-weight: bold;
    color: ${(props) => {
      return props.color || "var(--color-color)";
    }};
    ${(props) => {
      return props.size
        ? `
      font-size:${["1.5rem", "1.4rem", "1.2rem", "1.1rem"][props.size]}
    `
        : null;
    }}
  }
`;

export default PageHeader;
