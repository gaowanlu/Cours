import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import CardLayout from "../components/CardLayout";
import PageNavigationBar from "../components/PageNavigationBar";
import Table from "../components/Table";
import courseBase from "../data/courseBase";
import xfjCalc from "../data/xfjCalc";
import ViewPagerNav from "../components/ViewPagerNav";
import ViewPager from "../components/ViewPager";
import "swiper/css";

/**
 * 个人成绩页面
 * @returns
 */
function ScorePage() {
  const tableHead = ["课程", "实验", "平时", "考核", "总分"];
  const tableHead1 = ["学期", "估计学分绩"];
  const [tableRows, setTableRows] = useState([]); //成绩单列表数据
  const [tableRows1, setTableRows1] = useState([]); //学分绩列表数据
  const [xfj, setXfj] = useState(null); //学分绩数据
  const [nowPageIndex, setNowPageIndex] = useState(0); //viewpager现在的下标
  const [swiper, setSwiper] = useState(null); //swiper
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
    xfjCalc((result) => {
      console.log("学分绩", result);
      setXfj(result);
      let tableData = [];
      for (let term in result.xfj) {
        tableData.push([term, result.xfj[term].result]);
      }
      tableData.push(["入学估计", result.result_all]);
      tableData.push(["", "仅供参考..."]);
      setTableRows1(tableData);
    });
    return () => {};
  }, []);

  useEffect(() => {
    console.log("学分绩计算完毕");
  }, [xfj]);

  const viewPagerClickHandle = (index) => {
    setNowPageIndex(index);
    swiper.slideTo(index);
  };

  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar title="成绩查询" backTitle="更多" backPath="/more" />
      <PageContainer className="animate__animated animate__fadeInRight animate__faster">
        <PageHeader title="成绩查询" />
        <ViewPagerNav
          textList={["成绩单", "学分绩"]}
          nowPageIndex={nowPageIndex}
          indexChangeCallback={viewPagerClickHandle}
        />
        <ViewPager setNowPageIndex={setNowPageIndex} setSwiper={setSwiper}>
          <CardLayout>
            <Table head={tableHead} rows={tableRows} />
          </CardLayout>
          <CardLayout>
            <Table head={tableHead1} rows={tableRows1} />
          </CardLayout>
        </ViewPager>
      </PageContainer>
    </React.Fragment>
  );
}

export default ScorePage;
