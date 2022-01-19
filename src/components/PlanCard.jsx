import React from "react";
import styled from "styled-components";

/**
 *
 * @param {seq:string,cname:string,room:string,teacher:string} props
 * @returns
 */
function PlanCard(props) {
  const cardClick = (e) => {
    props.onClick("show", props);
  };
  return (
    <Card onClick={cardClick} theme={props.theme}>
      <div>
        {props.seq} {props.cname}
      </div>
      <div>教室 {props.room}</div>
      <div>讲授 {props.teacher}</div>
    </Card>
  );
}
const Card = styled.div`
  background-color: #fafafa;
  border-radius: 12px;
  margin-bottom: 14px;
  padding: 0.6rem;
  div {
    margin: 0.3rem;
  }
  box-shadow: 0px 0px 10px 1px #f0f0f0;
  font-weight: lighter;
  cursor: pointer;
  ${(props) => {
    return props.theme&&props.theme.color
      ? `background-color: ${props.theme.color.frontBackground};
         color:${props.theme.color.color};
         box-shadow: ${props.theme.box.boxShadow};
         `
      : "";
  }}
`;
export default PlanCard;
