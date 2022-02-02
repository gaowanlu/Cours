import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

/**
 * 气泡 {date}
 */
function Message(props) {
  return (
    <Tooltip title={props.date || ""} placement="bottom">
      <MessageContainer>{props.info}</MessageContainer>
    </Tooltip>
  );
}

/**消息
 * {info,id,date,index,rgb}
 *
 */
export default class MessageBubble extends Component {
  render() {
    const v = this.props;
    return (
      <CardLayoutStyled>
        <Header>
          <Avatar
            sx={{
              backgroundColor: `rgb(${v.rgb[0]}, ${v.rgb[1]}, ${v.rgb[2]})`,
              cursor: "pointer",
              float: "left",
              margin: "0px 10px 10px 0px",
            }}
          >
            {v.id}
          </Avatar>
          <UserId>{v.id.toUpperCase()}</UserId>
          <Message info={this.props.info} date={this.props.date.toString()} />
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
