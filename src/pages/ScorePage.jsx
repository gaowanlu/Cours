import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import CardLayout from "../components/CardLayout";
import PageNavigationBar from "../components/PageNavigationBar";
import Table from "../components/Table";
import courseBase from "../data/courseBase";
import xfjCalc from "../data/xfjCalc";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
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
        <ViewPagerNav>
          <ViewPagerNavButton
            onClick={(e) => viewPagerClickHandle(0)}
            active={nowPageIndex === 0}
          >
            成绩单
          </ViewPagerNavButton>
          <ViewPagerNavButton
            onClick={(e) => viewPagerClickHandle(1)}
            active={nowPageIndex === 1}
          >
            学分绩
          </ViewPagerNavButton>
        </ViewPagerNav>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={(swiper) => {
            setNowPageIndex(swiper.activeIndex);
          }}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          <SwiperSlide>
            <CardLayout>
              <Table head={tableHead} rows={tableRows} />
            </CardLayout>
          </SwiperSlide>
          <SwiperSlide>
            <CardLayout>
              <Table head={tableHead1} rows={tableRows1} />
            </CardLayout>
          </SwiperSlide>
        </Swiper>
      </PageContainer>
    </React.Fragment>
  );
}

const ViewPagerNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 3rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  padding: 1rem;
`;

const ViewPagerNavButton = styled.button`
  background-color: var(--color-background);
  color: ${(props) =>
    props.active ? "var(--color-primary)" : "var(--color-color)"};
  height: 2rem;
  width: 6rem;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-right: 1rem;
  font-weight: bold;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 0.4rem;
    background-color: var(--color-primary);
    left: 0;
    bottom: -0.5rem;
    border-radius: 0.25rem;
    display: ${(props) => (props.active ? "default" : "none")};
    &:focus {
      outline: 0;
    }
  }
`;

export default ScorePage;
