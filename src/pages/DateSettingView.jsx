import React from "react";
import { Header, Container } from "./MoreView";
import CardLayout from "./../components/CardLayout";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";

function DateSettingView() {
  const theme = useSelector(selectTheme);
  return (
    <Container
      theme={theme}
      className="animate__animated animate__fadeInRight animate__faster"
    >
      <Header>
        <p>日期设置</p>
      </Header>
      <CardLayout theme={theme}>HELLO WORLD</CardLayout>
    </Container>
  );
}

export default DateSettingView;
