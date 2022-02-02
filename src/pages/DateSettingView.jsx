import React, { useState } from "react";
import { Header, Container } from "./MoreView";
import Slider from "@mui/material/Slider";
import InfoList from "../components/InfoList";
import courseBase from "../data/courseBase";
import SwitchCard from "../components/SwitchCard";
import PageNavigationBar from "../components/PageNavigationBar";

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
function DateSettingView() {
  const [year, setYear] = useState(parseInt(courseBase.nowYear()));
  const [term, setTerm] = useState(parseInt(courseBase.nowTerm()));
  const [week, setWeek] = useState(parseInt(courseBase.nowWeek()));
  const [checked, setChecked] = React.useState(false); //深色模式开关
  //深色模式开关回调
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  //0 春季 1秋季 2小学期
  const getTermText = (term) => {
    let list = ["春季", "秋季", "三世界"];
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
      <PageNavigationBar
        title="日期设置"
        backTitle="更多"
        backPath="/more"
      />
      <Container
        className="animate__animated animate__fadeInRight animate__faster"
      >
        <Header title={"时间设置"} />
        {/*自动校准开关*/}
        <SwitchCard
          title={"自动校准"}
          checked={checked}
          onChange={handleChange}
        />
        {/*周调整*/}
        <InfoList {...weekList}  bottomAlert="" />
        {/*学期调整*/}
        <InfoList {...termList}  bottomAlert="" />
        {/*年调整*/}
        <InfoList {...yearList} bottomAlert="" />
      </Container>
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

export default DateSettingView;
