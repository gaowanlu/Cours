import React from "react";
import styled from "styled-components";
import CardLayout from "./CardLayout";

/**
 *
 * @param {title:string,rows:[title:string,content:string],bottomAlert:string} props
 * @returns
 */
function InfoList(props) {
  return (
    <CardLayout>
      <Title>{props.title}</Title>
      {props.rows &&
        props.rows.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Row>{item.title}</Row>
              <RowContent>{item.content}</RowContent>
            </React.Fragment>
          );
        })}
      <Alter>{props.bottomAlert}</Alter>
    </CardLayout>
  );
}

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--color-primary);
`;
const Row = styled.div`
  margin-top: 1.3rem;
  padding-bottom: 0.5rem;
  font-size: 1rem;
`;
const RowContent = styled.div`
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  padding: 0.7rem;
  padding-left: 0.5rem;
  cursor: pointer;
  transition-duration: 0.2s;
  font-size: 0.9rem;
  line-height: 1.3rem;
  color: var(--color-color);
  background-color: var(--color-background);
`;

const Alter = styled.div`
  margin-top: 2rem;
  font-weight: lighter;
  text-align: right;
`;

export default InfoList;
