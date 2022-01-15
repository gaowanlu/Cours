import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

/**
 *
 * @param {list:[{Icon:Compnent,to:path(can null),text:string}]} props
 * @returns
 */
function ChooseList(props) {
  return (
    <List>
      {props.list.map((item) => {
        let Icon = item.Icon;
        return (
          <Link to={item.to}>
            <li>
              <ListIconBox>
                <Icon />
              </ListIconBox>
              <ListContentBox>{item.text}</ListContentBox>
              <ListRightArrowBox>
                <ArrowForwardIosIcon />
              </ListRightArrowBox>
            </li>
          </Link>
        );
      })}
    </List>
  );
}

const List = styled.ul`
  li {
    list-style: none;
    display: flex;
    background-color: #f5f5f5;
    margin-top: 5px;
    cursor: pointer;
    border-radius: 5px;
    padding: 0.4rem 0px 0.4rem 0px;
    &:hover {
      background-color: #e9e8e8;
    }
    transition-duration: 0.2s;
  }
  a {
    color: #1d1d1f;
    text-decoration: none;
  }
`;

const ListIconBox = styled.div`
  height: 2rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff8364;
`;

const ListContentBox = styled.div`
  flex: 1;
  height: 2rem;
  line-height: 2rem;
  padding-left: 0.4rem;
`;

const ListRightArrowBox = styled.div`
  width: 3rem;
  height: 2rem;
  svg {
    font-size: 1rem;
    margin-right: 0.5rem;
  }
  color: #707070;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default ChooseList;
