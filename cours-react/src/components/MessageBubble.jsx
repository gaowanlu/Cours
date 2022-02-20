import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

/****************************************************垃圾代码没有参考价值 样式规划的不好 计划重构 重新进行布局方案设计****************************************************** */
/**
 * 气泡
 * {
 *    date:Date,
 *    toRight:boolean
 * }
 */
function Message(props) {
  return (
    <Tooltip title={props.date || ""} placement="bottom">
      <MessageContainer toRight={props.toRight}>{props.info}</MessageContainer>
    </Tooltip>
  );
}

/**消息气泡
 * {
 *  info:string,
 *  id:string,
 *  date:Date,
 *  index:number,
 *  rgb:[r:number,g:number,b:number],
 *  toRight:boolean 是否为自己发的消息
 * }
 */
export default class MessageBubble extends Component {
  render() {
    const v = this.props;
    console.log("toRight", v.toRight);
    return (
      <CardLayoutStyled toRight={v.toRight}>
        <Avatar
          sx={{
            backgroundColor: `rgb(${v.rgb[0]}, ${v.rgb[1]}, ${v.rgb[2]})`,
            cursor: "pointer",
            float: `${v.toRight ? "right" : "left"}`,
            margin: "0px 10px 10px 0px",
          }}
        >
          {v.id}
        </Avatar>
        <UserId toRight={v.toRight}>{v.id.toUpperCase()}</UserId>
        <Message
          info={this.props.info}
          date={this.props.date.toString()}
          toRight={v.toRight}
        />
        <br />
      </CardLayoutStyled>
    );
  }
}

const CardLayoutStyled = styled.div`
  padding: 1rem 0;
  clear: both;
  ${(props) => {
    if (props.toRight) {
      return `
        padding: 1rem 0rem;
      `;
    }
  }}
`;
const UserId = styled.div`
  font-size: 0.5rem;
  padding: 0 0.5rem;
  ${(props) => {
    if (props.toRight) {
      return `
        text-align:right;
        padding-right:3.8rem;
      `;
    }
  }}
`;
const MessageContainer = styled.div`
  width: 50%;
  color: #fafafa;
  max-width: 40ch;
  background-color: #b4876c;
  min-height: 2rem;
  margin-left: 60px;
  margin-top: 10px;
  padding: 0.5rem;
  position: relative;
  word-break: break-word;
  ${(props) => {
    if (props.toRight) {
      return `
          border-radius: 8px 4px 8px 8px;
          float:right;
          right:1.3rem;
          &::after {
            content: "";
            width: 0;
            height: 0;
            position: absolute;
            right: -10px;
            top: 3px;
            border-top: 10px solid #b4876c;
            border-right: 10px solid transparent;
          }
      `;
    } else {
      return `
        border-radius: 4px 8px 8px 8px;
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
    }
  }}
`;
