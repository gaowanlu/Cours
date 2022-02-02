import React from "react";
import courseBase from "../data/courseBase";
import InfoList from "../components/InfoList";
import { Header, Container } from "./MoreView"; //与MoreView同步
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import PageNavigationBar from "../components/PageNavigationBar";
import Fade from "react-reveal/Fade";

function SelfInfoView() {
  let list1 = {
    title: "基本信息",
    rows: [
      { title: "姓名", content: courseBase.selfInfo().data.name },
      { title: "性别", content: courseBase.selfInfo().data.sex },
      { title: "生日", content: courseBase.selfInfo().data.birthday },
      { title: "类别", content: courseBase.selfInfo().data.stype },
    ],
  };
  let list2 = {
    title: "其他信息",
    rows: [
      { title: "宿舍", content: courseBase.selfInfo().data.hostel },
      { title: "状态", content: courseBase.selfInfo().data.changetype },
      { title: "班级", content: courseBase.selfInfo().data.classno },
      { title: "入学日期", content: courseBase.selfInfo().data.enrolldate },
      { title: "级别", content: courseBase.selfInfo().data.grade },
    ],
  };
  const theme = useSelector(selectTheme);
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar
        theme={theme}
        title="个人信息"
        backTitle="更多"
        backPath="/more"
      />
      <Container
        theme={theme}
        className="animate__animated animate__fadeInRight  animate__faster"
      >
        <Header theme={theme} title={"个人信息"} />
        <Fade bottom>
          <InfoList {...list1} theme={theme} bottomAlert="" />
        </Fade>
        <Fade bottom>
          <InfoList
            {...list2}
            theme={theme}
            bottomAlert="声明:我们在服务器中不会记录您的个人信息包括账号密码。"
          />
        </Fade>
      </Container>
    </React.Fragment>
  );
}

export default SelfInfoView;
