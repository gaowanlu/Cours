import React from "react";
import courseBase from "../data/courseBase";
import InfoList from "../components/InfoList";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import PageNavigationBar from "../components/PageNavigationBar";

function SelfInfoPage() {
  let list1 = {
    title: "基本信息",
    rows: [
      { title: "姓名", content: courseBase.selfInfo().data.name },
      { title: "性别", content: courseBase.selfInfo().data.sex },
      { title: "生日", content: courseBase.selfInfo().data.birthday.substring(0, 10) },
      { title: "类别", content: courseBase.selfInfo().data.stype },
    ],
  };
  let list2 = {
    title: "其他信息",
    rows: [
      { title: "宿舍", content: courseBase.selfInfo().data.hostel },
      { title: "状态", content: courseBase.selfInfo().data.changetype },
      { title: "班级", content: courseBase.selfInfo().data.classno },
      { title: "入学日期", content: courseBase.selfInfo().data.enrolldate.substring(0, 10) },
      { title: "级别", content: courseBase.selfInfo().data.grade },
    ],
  };
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar title="个人信息" backTitle="更多" backPath="/more" />
      <PageContainer className="animate__animated animate__fadeInRight  animate__faster">
        <PageHeader title={"个人信息"} />
        <InfoList {...list1} bottomAlert="" />
        <InfoList
          {...list2}
          bottomAlert="声明:我们在服务器中不会记录您的个人信息包括账号密码。"
        />
      </PageContainer>
    </React.Fragment>
  );
}

export default SelfInfoPage;
