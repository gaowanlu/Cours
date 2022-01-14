import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ChooseList(props) {
  return (
    <List>
      <li>
        <Link to="/selfInfo">
          <h2>个人信息</h2>
        </Link>
      </li>
      <li>
        <Link to="/selfInfo">
          <h2>成绩</h2>
        </Link>
      </li>
      <li>
        <h2>加载数据</h2>
      </li>
      <li>
        <ListIconBox></ListIconBox>
              <ListContentBox>日期设置</ListContentBox>
              <ListRightArrowBox></ListRightArrowBox>
      </li>
    </List>
  );
}

const List = styled.ul`
  li {
    list-style: none;
    display: flex;
    background-color: #edf7fd;
    margin-top:5px;
    cursor:pointer;
  }
`;

const ListIconBox = styled.div`
  height: 2rem;
  width: 3rem;
  background-color: #ffee00;
`;

const ListContentBox = styled.div`
  flex: 1;
  height: 2rem;
  line-height: 2rem;
  padding-left: 0.4rem;
`;
const ListRightArrowBox=styled.div`
    width:3rem;
    height:2rem;
    background-color:pink;
`;

export default ChooseList;
