import React from "react";
import styled from "styled-components";

/**
 *
 * @param {seq:string,cname:string,room:string,teacher:string} props
 * @returns
 */
function PlanCard(props) {
  return (
    <Card>
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
  box-shadow: 0px 0px 10px 2px #f0f0f0;
  /* color:#1d1d1f; */
  font-weight: lighter;
  cursor: pointer;
  &:hover {
    background-color: #e7f1f8;
  }
`;
export default PlanCard;
