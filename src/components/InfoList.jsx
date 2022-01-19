import React from "react";
import styled from "styled-components";

/**
 *
 * @param {title:string,rows:[title:string,content:string]} props
 * @returns
 */
function InfoList(props) {
  return (
    <Card theme={props.theme}>
      <Title>{props.title}</Title>
      {props.rows.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Row>{item.title}</Row>
            <RowContent theme={props.theme}>{item.content}</RowContent>
          </React.Fragment>
        );
      })}
      <Alter>声明:我们在服务器中不会记录您的个人信息包括账号密码。</Alter>
    </Card>
  );
}

const Card = styled.div`
  min-height: calc(100vh - 6rem);
  background-color: #fafafa;
  border-radius: 12px;
  padding: 1rem;
  color: #1d1d1f;
  padding-bottom: 5rem;
  ${(props) => {
    return props.theme
      ? `
      background-color: ${props.theme.color.frontBackground};
      color:${props.theme.color.color}
  `
      : null;
  }}
`;
const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const Row = styled.div`
  margin-top: 0.5rem;
  padding: 5px;
  font-size: 0.8rem;
`;
const RowContent = styled.div`
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  padding: 5px;
  height: 2rem;
  line-height: 2rem;
  cursor: pointer;
  transition-duration: 0.2s;
  letter-spacing: 0.1rem;
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
