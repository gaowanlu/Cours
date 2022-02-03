import React from "react";
import { Header, Container } from "./MoreView";
import PageNavigationBar from "../components/PageNavigationBar";
import courseBase from "./../data/courseBase";
import styled from "styled-components";
import stringHashRGB from "./../utils/stringHashRGB.ts";
/**
 * 组件调试界面
 * @returns
 */
function DebugView(props) {
  const examList = courseBase.examList().data;
  console.log(examList);
  return (
    <React.Fragment>
      {/*导航栏*/}
      <PageNavigationBar title="考试安排" backTitle="更多" backPath="/more" />
      <Container className="animate__animated animate__fadeInRight animate__faster">
        
      </Container>
    </React.Fragment>
  );
}



export default DebugView;
