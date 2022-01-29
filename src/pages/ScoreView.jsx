import React, { useEffect, useState } from "react";
import { Header, Container } from "./MoreView";
import CardLayout from "../components/CardLayout";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import PageNavigationBar from "../components/PageNavigationBar";
import Table from "../components/Table";
import courseBase from "../data/courseBase";


/**
 * 个人成绩页面
 * @returns
 */
function ScoreView() {
  const theme = useSelector(selectTheme);
  const tableHead = ["课程", "实验", "平时", "考核", "总分"];
  const [tableRows, setTableRows] = useState([]);
  useEffect(() => {
    courseBase.score((score) => {
      setTableRows(
        score.data
          .map((v, i) => {
            return [v.cname, v.sycj, v.pscj, v.khcj, v.zpcj];
          })
          .reverse()
      );
    });
    return () => {};
  }, []);
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar
        theme={theme}
        title="成绩查询"
        backTitle="更多"
        backPath="/more"
      />
      <Container
        theme={theme}
        className="animate__animated animate__fadeInRight animate__faster"
      >
        <Header theme={theme} title="成绩查询" />
        <CardLayout theme={theme}>
          <Table theme={theme} head={tableHead} rows={tableRows} />
        </CardLayout>
      </Container>
    </React.Fragment>
  );
}

export default ScoreView;
