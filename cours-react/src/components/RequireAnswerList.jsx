import React from "react";
import styled from "styled-components";
import RequireContentCard from "./RequireContentCard";

function RequireAnswerList() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <List>
        {list.map((item) => {
          return (
            <li key={item}>
              <RequireContentCard />
            </li>
          );
        })}
      </List>
    </>
  );
}

const List = styled.ul`
  & > li {
    list-style: none;
  }
`;

export default RequireAnswerList;
