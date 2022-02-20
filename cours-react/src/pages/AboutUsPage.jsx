import React from "react";
import CardLayout from "../components/CardLayout";
import styled from "styled-components";
import { useSelector } from "react-redux";
import LogoPNG from "../assets/png/logo.png";
import InfoList from "../components/InfoList";
import PageNavigationBar from "../components/PageNavigationBar";
import {
  selectProjectInfoList,
  selectWishInfoList,
} from "../features/aboutUs/aboutUsInfoSlice";
import { selectInfoList } from "../features/concatUs/concatUsInfoSlice";
import Fade from "react-reveal/Fade";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";

/**
 * 关于我们页面
 * @returns
 */
function AboutUsPage() {
  let projectInfoList = useSelector(selectProjectInfoList);
  let wishInfoList = useSelector(selectWishInfoList);
  let concatList = useSelector(selectInfoList);
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar title="关于我们" backTitle="更多" backPath="/more" />
      <PageContainer className="animate__animated animate__fadeInRight animate__faster">
        <PageHeader title="关于我们" size={0} />
        <Fade bottom>
          <CardLayout>
            <LogoContainer>
              <img src={LogoPNG} alt="" />
              <p>Cours 桂电课程表</p>
            </LogoContainer>
          </CardLayout>
        </Fade>

        <InfoList {...projectInfoList} bottomAlert="" />
        <InfoList {...wishInfoList} bottomAlert="" />
        <InfoList {...concatList[0]} bottomAlert="" />
        <InfoList {...concatList[1]} bottomAlert="" />
      </PageContainer>
    </React.Fragment>
  );
}

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  img {
    width: 4.6rem;
    height: 4.6rem;
    border-radius: 2.3rem;
  }
  p {
    text-align: center;
    padding-top: 0.5rem;
    padding: 1rem;
    font-size: 1.3rem;
    font-weight: bold;
    line-height: 4rem;
    background: linear-gradient(to right, rgb(248, 95, 95), rgb(92, 182, 235));
    -webkit-background-clip: text;
    color: transparent;
  }
`;

export default AboutUsPage;
