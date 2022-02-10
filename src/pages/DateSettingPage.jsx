import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import InfoList from "../components/InfoList";
import courseBase from "../data/courseBase";
import SwitchCard from "../components/SwitchCard";
import PageNavigationBar from "../components/PageNavigationBar";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";

/**
 * infolist 工厂
 * @param {*} title 标题
 * @param {*} content 组件
 * @returns
 */
function listCreator(title, content) {
  return {
    title,
    rows: [
      {
        title: ``,
        content,
      },
    ],
  };
}

/**
 * 日期设置页面
 * @returns
 */
function DateSettingPage() {
  const [year, setYear] = useState(parseInt(courseBase.nowYear()));
  const [term, setTerm] = useState(parseInt(courseBase.nowTerm()));
  const [week, setWeek] = useState(parseInt(courseBase.nowWeek()));
  const [checked, setChecked] = React.useState(courseBase.autoTime()); //自动日期开关
  //自动日期开关回调
  const handleChange = (event) => {
    setChecked(event.target.checked);
    courseBase.autoTime(event.target.checked.toString());
  };
  //0 春季 1秋季 2小学期
  const getTermText = (term) => {
    let list = ["春季", "秋季", "小学期"];
    return list[term];
  };
  //年调整 infolist
  const yearList = listCreator(
    `${year} 年`,
    <YearSetting setYear={setYear} value={year} />
  );
  //学期调整 infolist
  const termList = listCreator(
    `${getTermText(term)}`,
    <TermSetting setTerm={setTerm} value={term} />
  );
  //周调整 infolist
  const weekList = listCreator(
    `第 ${week} 周`,
    <WeekSetting setWeek={setWeek} value={week} />
  );
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar title="日期设置" backTitle="更多" backPath="/more" />
      <PageContainer className="animate__animated animate__fadeInRight animate__faster">
        <PageHeader title={"时间设置"} />
        {/*自动校准开关*/}
        <SwitchCard
          title={"自动校准"}
          checked={checked}
          onChange={handleChange}
        />
        {/*周调整*/}
        <InfoList {...weekList} bottomAlert="" />
        {/*学期调整*/}
        <InfoList {...termList} bottomAlert="🤦‍♂️功能正在调教中..." />
        {/*年调整*/}
        <InfoList {...yearList} bottomAlert="🤦‍♀️功能正在调教中..." />
      </PageContainer>
    </React.Fragment>
  );
}

/**
 * 年份设置组件
 * @param {*} props
 * @returns
 */
function YearSetting(props) {
  const yearChange = (e, v) => {
    courseBase.nowYear(v);
    props.setYear(v);
  };
  return (
    <React.Fragment>
      <Slider
        value={props.value}
        step={1}
        min={2018}
        max={2023}
        onChange={yearChange}
        sx={{
          color: "var(--color-primary)",
          marginLeft: "1rem",
          marginRight: "1rem",
          width: "calc(100% - 2rem)",
        }}
      />
    </React.Fragment>
  );
}

/**
 * 学期调整组件
 * @param {*} props
 * @returns
 */
function TermSetting(props) {
  const termChange = (e, v) => {
    courseBase.nowTerm(v.toString());
    props.setTerm(v);
  };
  return (
    <React.Fragment>
      <Slider
        value={props.value}
        step={1}
        min={0}
        max={2}
        onChange={termChange}
        sx={{
          color: "var(--color-primary)",
          marginLeft: "1rem",
          marginRight: "1rem",
          width: "calc(100% - 2rem)",
        }}
      />
    </React.Fragment>
  );
}

/**
 * 学习周调整组件
 * @param {*} props
 * @returns
 */
function WeekSetting(props) {
  const weekChange = (e, v) => {
    props.setWeek(v);
    courseBase.nowWeek(v); //本地存储现在为第几周
  };
  return (
    <React.Fragment>
      <Slider
        value={props.value}
        step={1}
        min={1}
        max={22}
        onChange={weekChange}
        sx={{
          color: "var(--color-primary)",
          marginLeft: "1rem",
          marginRight: "1rem",
          width: "calc(100% - 2rem)",
        }}
      />
    </React.Fragment>
  );
}

export default DateSettingPage;
