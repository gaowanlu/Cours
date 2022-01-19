import React from "react";
import styled from "styled-components";
import courseBase from "../data/courseBase";
import InfoList from "../components/InfoList";
import { Header, Container } from "./MoreView";
import { useSelector} from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";

function SelfInfoView() {
  let list = {
    title: "在校信息",
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
  const theme = useSelector(selectTheme);
  return (
    <Container theme={theme} className="animate__animated animate__bounceInUp  animate__faster">
      <Header theme={theme}>
        <p>个人信息</p>
      </Header>
      <InfoList {...list} theme={theme} />
    </Container>
  );
}

export default SelfInfoView;
