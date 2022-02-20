import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import Tooltip from "@mui/material/Tooltip";

/*根据所在页面 选择不同的icon*/
function FooterIconConfig(props) {
  let { index, fillIndex } = { ...props };
  let iconStyle = {
    color: "var(--color-primary)",
    fontSize: "2rem",
  };
  return (
    <React.Fragment>
      {index === 0 && (
        <React.Fragment>
          {fillIndex === 0 && <ArticleIcon style={iconStyle} />}
          {fillIndex !== 0 && <ArticleOutlinedIcon style={iconStyle} />}
        </React.Fragment>
      )}
      {index === 1 && (
        <React.Fragment>
          {fillIndex === 1 && <AssessmentIcon style={iconStyle} />}
          {fillIndex !== 1 && <AssessmentOutlinedIcon style={iconStyle} />}
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
  let fillIndex = props.fillIndex;
  const list = [
    { title: "日课表", to: "#", index: 0 },
    { title: "周课表", to: "#", index: 1 },
  ];
  const linkClickHandler = (e, index) => {
    e.preventDefault();
    props.click(index);
  };
  return (
    <Container>
      <Row>
        {list.map((o) => {
          return (
            <Tooltip title={o.title} placement="top" key={o.index}>
              <IconBox>
                <Link
                  to={o.to}
                  onClick={(e) => {
                    linkClickHandler(e, o.index);
                  }}
                >
                  <FooterIconConfig fillIndex={fillIndex} index={o.index} />
                </Link>
              </IconBox>
            </Tooltip>
          );
        })}
      </Row>
    </Container>
  );
}

const Container = styled.footer`
  height: 4rem;
  background-color: var(--color-background);
  color: var(--color-color);
  position: fixed;
  width: 100vw;
  bottom: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: var(--box-shadow);
  z-index: 995;
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
