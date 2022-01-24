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
    <CardLayout theme={props.theme}>
      <Title>{props.title}</Title>
      {props.rows &&
        props.rows.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Row>{item.title}</Row>
              <RowContent theme={props.theme}>{item.content}</RowContent>
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
`;
const Row = styled.div`
  margin-top: 1rem;
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
  ${(props) => {
    return props.theme
      ? `
      background-color: ${props.theme.color.background};
      color:${props.theme.color.color}
  `
      : null;
  }}
`;

const Alter = styled.div`
  margin-top: 2rem;
  font-weight: lighter;
  text-align: right;
`;

export default InfoList;
