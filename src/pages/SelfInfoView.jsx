import React from "react";
import styled from "styled-components";
import localStore from "./../data/localStore";

function SelfInfoView() {
  return (
    <Container>
      <Card>
        <Title>个人信息</Title>
        <Row>姓名</Row>
        <RowContent>{localStore.selfInfo().data.name}</RowContent>
        <Row>生日</Row>
        <RowContent>{localStore.selfInfo().data.birthday}</RowContent>
        <Row>状态</Row>
        <RowContent>{localStore.selfInfo().data.changetype}</RowContent>
        <Row>班级</Row>
        <RowContent>{localStore.selfInfo().data.classno}</RowContent>
        <Row>入学日期</Row>
        <RowContent>{localStore.selfInfo().data.enrolldate}</RowContent>
        <Row>宿舍</Row>
        <RowContent>{localStore.selfInfo().data.hostel}</RowContent>
        <Row>性别</Row>
        <RowContent>{localStore.selfInfo().data.sex}</RowContent>
        <Row>类别</Row>
        <RowContent>{localStore.selfInfo().data.stype}</RowContent>
        <Row>级别</Row>
        <RowContent>{localStore.selfInfo().data.grade}</RowContent>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  background-color: #f2f2f6;
`;
const Card = styled.div`
  min-height: calc(100vh - 6rem);
  background-color: #fafafa;
  border-radius: 12px;
  padding: 1rem;
  color: #1d1d1f;
  margin-bottom: 6rem;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const Row = styled.div`
  margin-top: 0.5rem;
  padding: 5px;
  font-size: 0.8rem;
`;
const RowContent = styled.div`
  background-color: #edeff1a6;
  border-radius: 5px;
  padding: 5px;
  height: 2rem;
  line-height: 2rem;
`;

export default SelfInfoView;
