import React from "react";
import styled from "styled-components";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import android from "../assets/png/android.png";
import ios from "../assets/png/ios.png";

/**
 * 下载卡片 提供ios/android下载提示
 * @returns
 */
function DownloadCard() {
  return (
    <Container>
      <Arrow />
      <Card>
        <p>安卓扫码下载 密码 cours</p>
        <QR src={android} alt="https://wwu.lanzout.com/i4iG600k3wri" />
        <p>ios/ipad扫码下载 密码 cours</p>
        <QR src={ios} alt="https://wwu.lanzout.com/iROctz04qch" />
      </Card>
    </Container>
  );
}
const Container = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  cursor: pointer;
  &:hover > div {
    visibility: visible;
  }
  @media screen and (max-width: 1000px) {
    visibility: hidden;
  }
`;

const Arrow = styled(ArrowCircleDownTwoToneIcon)`
  color: var(--color-primary);
  font-size: 1.8rem !important;
  @keyframes animateDown {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(5px);
    }
    60% {
      transform: translateY(3px);
    }
  }
  animation: animateDown infinite 1.5s;
`;

const Card = styled.div`
  position: absolute;
  visibility: hidden;
  width: 14rem;
  height: 17rem;
  background-color: var(--color-background-front);
  top: -19rem;
  right: 1rem;
  border-radius: 0.5rem;
  box-shadow: var(--bxo-shadow);
  padding: 1rem;
  p {
    color: var(--color-primary);
    margin: 0.5rem 0rem;
  }
  border: 1px solid var(--color-primary);
`;

const QR = styled.img`
  width: 6rem;
  height: 6rem;
  display: block;
`;

export default DownloadCard;
