import React from "react";
import styled from "styled-components";
import tableIcon from "../assets/svg/table.svg";
import homeIcon from "../assets/svg/home.svg";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

function FooterIconConfig(props) {
  let { index, fill } = { ...props };
  let iconStyle = {
    color: "#0066cc",
    fontSize: "2rem",
  };
  return (
    <React.Fragment>
      {index === 0 && (
        <React.Fragment>
          {fill === "table" && <ArticleIcon style={iconStyle} />}
          {fill !== "table" && <ArticleOutlinedIcon style={iconStyle} />}
        </React.Fragment>
      )}
      {index === 1 && (
        <React.Fragment>
          {fill === "week" && <AssessmentIcon style={iconStyle} />}
          {fill !== "week" && <AssessmentOutlinedIcon style={iconStyle} />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

/**
 *
 * @param {fill:string} props
 * @returns
 */
function Footer(props) {
  let fill = props.fill;
  return (
    <Container>
      <Row>
        <IconBox>
          <Link to="/table">
            <FooterIconConfig fill={fill} index={0} />
          </Link>
        </IconBox>
        <IconBox>
          <Link to="/week">
            <FooterIconConfig fill={fill} index={1} />
          </Link>
        </IconBox>
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
  box-shadow: 0px 0px 10px 1px #d1cfcf57;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const IconBox = styled.div`
  width: 2rem;
`;

export default Footer;
