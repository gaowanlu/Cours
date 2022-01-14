import React from "react";
import styled from "styled-components";
import tableIcon from "../assets/svg/table.svg";
import homeIcon from "../assets/svg/home.svg";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ClassIcon from "@mui/icons-material/Class";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

function FooterIconConfig(props) {
  let { index, fill } = { ...props };
  return (
    <React.Fragment>
      {index === 0 && (
        <React.Fragment>
          {fill === "table" && <ArticleIcon style={{ color: "#0066cc" }} />}
          {fill !== "table" && (
            <ArticleOutlinedIcon style={{ color: "#0066cc" }} />
          )}
        </React.Fragment>
      )}
      {index === 1 && (
        <React.Fragment>
          {fill === "week" && <ClassIcon style={{ color: "#0066cc" }} />}
          {fill !== "week" && (
            <ClassOutlinedIcon style={{ color: "#0066cc" }} />
          )}
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
        <div>
          <Link to="/table">
            <FooterIconConfig fill={fill} index={0} />
          </Link>
        </div>
        <div>
          <Link to="/week">
            <FooterIconConfig fill={fill} index={1} />
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

// const Icon = styled(AccessAlarmIcon)`
//   width: 2.6rem;
//   height: 2.6rem;
//   border-radius: 1.3rem;
//   cursor: pointer;
// `;

export default Footer;
