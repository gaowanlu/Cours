import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import WeekTable from "../components/WeekTable";
import DialogWindow from "../components/DialogWindow";

function WeekView() {
  const [dialogShow, setDialogShow] = useState(false);
  let dialogClose = () => {
    setDialogShow(false);
  };
  return (
    <React.Fragment>
      <Container className="animate__animated animate__slideInRight  animate__faster">
        <Content>
          <WeekTable
            courseClick={() => {
              setDialogShow(true);
            }}
          />
        </Content>
      </Container>
      <Footer fill="week" />
      {/* 弹窗 */}
      {dialogShow && (
        <DialogWindow close={dialogClose}>HELLO WORLD</DialogWindow>
      )}
    </React.Fragment>
  );
}

const Container = styled.div`
  /* width: 100vw; */
  min-height: 100vh;
  background-color: #f2f2f6;
`;
const Content = styled.div`
  padding: 1rem;
`;

export default WeekView;
