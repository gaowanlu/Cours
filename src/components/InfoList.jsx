import React from "react";
import styled from "styled-components";

/**
 *
 * @param {title:string,rows:[title:string,content:string]} props
 * @returns
 */
function InfoList(props) {
  return (
    <Card>
      <Title>{props.title}</Title>
      {props.rows.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Row>{item.title}</Row>
            <RowContent>{item.content}</RowContent>
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
  border-radius: 5px;
  padding: 5px;
  height: 2rem;
  line-height: 2rem;
  cursor: pointer;
  &:hover {
    background-color: #e9e8e8;
  }
  transition-duration: 0.2s;
`;

const Alter = styled.div`
  margin-top: 2rem;
  color: #707070;
  font-weight: lighter;
  text-align: right;
`;

export default InfoList;
