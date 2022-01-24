import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import WeekTable from "../components/WeekTable.tsx";
import DialogWindow from "../components/DialogWindow";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";

function WeekView() {
  const [dialogShow, setDialogShow] = useState(false);
  /*获取主题配置*/
  const theme = useSelector(selectTheme);
  return (
    <React.Fragment>
      <Container
        theme={theme}
        className="animate__animated animate__slideInRight  animate__faster"
      >
        <Content>
          <WeekTable
            courseClick={() => {
              setDialogShow(true);
            }}
            theme={theme}
          />
        </Content>
      </Container>
      {/* 弹窗 */}
      {dialogShow && (
        <DialogWindow
          close={() => {
            setDialogShow(false);
          }}
          theme={theme}
        >
          HELLO WORLD
        </DialogWindow>
      )}
      {/* 底部导航栏 */}
      <Footer fill="week" theme={{ ...theme }} />
    </React.Fragment>
  );
}

const Container = styled.div`
  /* width: 100vw; */
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.background};
`;
const Content = styled.div`
  padding: 1rem;
`;

export default WeekView;
