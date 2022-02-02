import React from "react";
import styled from "styled-components";
import Switch from "@mui/material/Switch";
import CardLayout from "./CardLayout";

/**
 * 开关卡片
 * @param {checked:boolean,onChange:function(e),title:string} props
 * @returns
 */
function SwitchCard(props) {
  return (
    <CardLayout>
      <SwitchBox>
        <span>{props.title}</span>
        <SwitchStyled checked={props.checked} onChange={props.onChange} />
      </SwitchBox>
    </CardLayout>
  );
}

const SwitchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/*重写开关样式*/
const SwitchStyled = styled(Switch)`
  span {
    color: var(--color-primary) !important;
  }
  .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked
    + .MuiSwitch-track {
    background-color: var(--color-primary) !important;
  }
  input {
    color: red !important;
  }
`;

export default SwitchCard;
