import React from "react";
import styled from "styled-components";

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
  }
`;

export default PageHeader;
