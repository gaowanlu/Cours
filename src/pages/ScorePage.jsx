import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import CardLayout from "../components/CardLayout";
import PageNavigationBar from "../components/PageNavigationBar";
import Table from "../components/Table";
import courseBase from "../data/courseBase";

/**
 * 个人成绩页面
 * @returns
 */
function ScorePage() {
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
      <PageNavigationBar title="成绩查询" backTitle="更多" backPath="/more" />
      <PageContainer className="animate__animated animate__fadeInRight animate__faster">
        <PageHeader title="成绩查询" />
        <CardLayout>
          <Table head={tableHead} rows={tableRows} />
        </CardLayout>
      </PageContainer>
    </React.Fragment>
  );
}

export default ScorePage;
