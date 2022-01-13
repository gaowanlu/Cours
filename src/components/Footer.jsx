import React from "react";
import styled from "styled-components";
import tableIcon from "../assets/svg/table.svg";
import homeIcon from "../assets/svg/home.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Container>
      <Row>
        <div>
          <Link to="/table">
            <Icon src={tableIcon} />
          </Link>
        </div>
        <div>
          <Link to="/week">
            <Icon src={homeIcon} />
          </Link>
        </div>
      </Row>
    </Container>
  );
}

const Container = styled.footer`
  height: 4rem;
  background-color: #fafafa;
  color: #fafafa;
  position: fixed;
  width: 100vw;
  bottom: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0px 0px 10px 1px #d1cfcf;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  cursor: pointer;
`;

export default Footer;
