import React from "react";
import styled from "styled-components";

function RequireContentCard() {
  return (
    <ContentCard>
      <p>@gaowanlu</p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;content=最近感觉很菜鸡！
        欢迎您帮助开发或者宣传，
      </p>
    </ContentCard>
  );
}

const ContentCard = styled.section`
  margin: 1rem 0rem;
  background-color: #838282;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  & > p {
    margin: 0.3rem 0;
  }
  background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
  color: #252525;
`;

export default RequireContentCard;
