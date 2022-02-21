import React from "react";
import styled from "styled-components";

/**
 *
 * @param {seq:string,cname:string,room:string,teacher:string} props
 * @returns
 */
function PlanCard(props) {
  const cardClick = (e) => {};
  return (
    <Card onClick={cardClick}>
      <p>
        {props.seq} {props.cname}
      </p>
      <p>
        教室 {props.room} {props.memo}
      </p>
      <p>讲授 {props.teacher}</p>
    </Card>
  );
}
const Card = styled.div`
  background-color: #fafafa;
  border-radius: 12px;
  margin-bottom: 14px;
  padding: 0.6rem;
  & p:first-child {
    color: var(--color-primary);
  }
  p {
    margin: 0.3rem;
    line-height: 1.5rem;
  }
  box-shadow: 0px 0px 10px 1px #f0f0f0;
  /* font-weight: bold; */
  cursor: pointer;
  background-color: var(--color-background-front);
  color: var(--color-color);
  box-shadow: var(--box-shadow);
`;
export default PlanCard;
