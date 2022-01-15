import React from "react";
import styled from "styled-components";
import courseBase from "../data/courseBase";
import InfoList from "../components/InfoList";

function SelfInfoView() {
  let list = {
    title: "个人信息",
    rows: [
      { title: "姓名", content: courseBase.selfInfo().data.name },
      { title: "生日", content: courseBase.selfInfo().data.birthday },
      { title: "状态", content: courseBase.selfInfo().data.changetype },
      { title: "班级", content: courseBase.selfInfo().data.classno },
      { title: "入学日期", content: courseBase.selfInfo().data.enrolldate },
      { title: "宿舍", content: courseBase.selfInfo().data.hostel },
      { title: "性别", content: courseBase.selfInfo().data.sex },
      { title: "类别", content: courseBase.selfInfo().data.stype },
      { title: "级别", content: courseBase.selfInfo().data.grade },
    ],
  };
  return (
    <Container className="animate__animated animate__bounceInUp  animate__faster">
      <InfoList {...list} />
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  padding-top: 2rem;
  background-color: #f2f2f6;
`;

export default SelfInfoView;
