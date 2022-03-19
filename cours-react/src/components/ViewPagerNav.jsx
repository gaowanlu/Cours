import React from "react";
import styled from "styled-components";

function ViewPagerNav({ indexChangeCallback, nowPageIndex, textList }) {
  return (
    <ViewPagerNavContainer>
      {textList.map((o, i, a) => {
        return (
          <ViewPagerNavButton
            key={o}
            onClick={(e) => indexChangeCallback(i)}
            active={nowPageIndex === i}
          >
            {o}
          </ViewPagerNavButton>
        );
      })}
    </ViewPagerNavContainer>
  );
}

const ViewPagerNavContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 3rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  padding: 1rem;
`;

const ViewPagerNavButton = styled.button`
  background-color: var(--color-background);
  color: ${(props) =>
    props.active ? "var(--color-primary)" : "var(--color-color)"};
  height: 2rem;
  width: 6rem;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-right: 1rem;
  font-weight: bold;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 0.25rem;
    background-color: var(--color-primary);
    left: 0;
    bottom: -0.5rem;
    border-radius: 0.25rem;
    display: ${(props) => (props.active ? "default" : "none")};
    &:focus {
      outline: 0;
    }
  }
`;

export default ViewPagerNav;
