import React from "react";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

/*登录前景 覆盖视域整个范围*/
function LoginModal(props) {
  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Content>
          <CircularProgress />
          <Title theme={props.theme}>
            大约8s 请耐心等待 如2min没有成功则请重试
          </Title>
        </Content>
      </Modal>
    </div>
  );
}

const Content = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  ${(props) => {
    return props.theme.color
      ? `
        color:${props.theme.color.color};
    `
      : null;
  }}
`;

export default LoginModal;
