import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

/**
 * 气泡
 */
function Message(props) {
  return <MessageContainer>{props.info}</MessageContainer>;
}

/**消息
 * {info,id,date,index}
 *
 */
export default class MessageBubble extends Component {
  render() {
    const v = this.props;
    return (
      <CardLayoutStyled theme={this.props.theme}>
        <Header>
          <Avatar
            sx={{
              backgroundColor: "var(--color-primary)",
              cursor: "pointer",
              float: "left",
              margin: "0px 10px 10px 0px",
            }}
          >
            {v.id}
          </Avatar>
          <UserId>{v.id.toUpperCase()}</UserId>
          <Tooltip title={"你好"} placement="top">
            <Message info={this.props.info} />
          </Tooltip>
        </Header>
        <br />
      </CardLayoutStyled>
    );
  }
}

const CardLayoutStyled = styled.div`
  margin: 1.5rem 0;
`;
const UserId = styled.div`
  font-size: 0.5rem;
  padding: 0 0.5rem;
`;
const Header = styled.div`
  /* display: flex; */
`;
const MessageContainer = styled.div`
  width: 60%;
  color: #fafafa;
  max-width: 15rem;
  background-color: #b4876c;
  border-radius: 4px 8px 8px 8px;
  min-height: 2rem;
  margin-left: 60px;
  margin-top: 10px;
  padding: 0.5rem;
  position: relative;
  word-break: break-word;
  &::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    left: -10px;
    top: 3px;
    border-top: 10px solid #b4876c;
    border-left: 10px solid transparent;
  }
`;
