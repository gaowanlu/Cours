import React from "react";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

/**
 *
 * @param {theme,backTitle:string,title:string,backPath} props
 * @returns
 */
function PageNavigationBar(props) {
  const history = useNavigate();
  const backEvent = (e) => {
    history(props.backPath, { replace: true });
  };
  return (
    <React.Fragment>
      <Container theme={props.theme}>
        <BackIconBox onClick={backEvent}>
          <ArrowBackIosNewIcon sx={{ fontSize: "1.3rem" }} />
          <span>{props.backTitle}</span>
        </BackIconBox>
        <Title>{props.title}</Title>
      </Container>
      <BlankSpace />
    </React.Fragment>
  );
}

const Container = styled.div`
  height: 3rem;
  background-color: var(--color-background);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  ${(props) => {
    return props.theme && props.theme.color
      ? `
        background-color:${props.theme.color.background};
        box-shadow:${props.theme.box.boxShadow};
        color:${props.theme.color.color}
    `
      : null;
  }}
`;

const Title = styled.div`
  text-align: center;
  flex: 1;
  /* font-weight: bold; */
`;

const BlankSpace = styled.div`
  background-color: "#0000000";
  height: 3.5rem;
`;

const BackIconBox = styled.div`
  color: var(--color-primary);
  cursor: pointer;
  position: absolute;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    height: 100%;
    /* vertical-align: baseline; */
  }
`;

export default PageNavigationBar;