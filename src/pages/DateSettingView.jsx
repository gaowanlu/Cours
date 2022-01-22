import React, { useState } from "react";
import { Header, Container } from "./MoreView";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import Slider from "@mui/material/Slider";
import InfoList from "../components/InfoList";
import courseBase from "../data/courseBase";

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

function DateSettingView() {
  const theme = useSelector(selectTheme);
  const [year, setYear] = useState(parseInt(courseBase.nowYear()));
  const [term, setTerm] = useState(parseInt(courseBase.nowTerm()));
  const [week, setWeek] = useState(parseInt(courseBase.nowWeek()));
  const getTermText = (term) => {
    let list = ["春季", "秋季", "三世界"];
    return list[term];
  };
  const yearList = listCreator(
    `${year} 年`,
    <YearSetting setYear={setYear} value={year} />
  );
  const termList = listCreator(
    `${getTermText(term)}`,
    <TermSetting setTerm={setTerm} value={term} />
  );
  const weekList = listCreator(
    `第 ${week} 周`,
    <WeekSetting setWeek={setWeek} value={week} />
  );
  return (
    <Container
      theme={theme}
      className="animate__animated animate__fadeInRight animate__faster"
    >
      <Header>
        <p>时间设置</p>
      </Header>
      <InfoList {...weekList} theme={theme} bottomAlert="" />
      <InfoList {...termList} theme={theme} bottomAlert="" />
      <InfoList {...yearList} theme={theme} bottomAlert="" />
    </Container>
  );
}

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
