import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import WeekTable from "../components/WeekTable";

function WeekView() {
  return (
    <React.Fragment>
      <Container>
        <Content>
          <WeekTable />
        </Content>
      </Container>
      <Footer fill="week" />
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
