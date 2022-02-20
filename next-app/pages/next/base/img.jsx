import React from "react";
import Image from "next/image";
import logoPic from "../../../assets/png/logo.png";
import styled from "styled-components";

/*next中的图像优化*/
function img() {
  return (
    <div>
      <h1>Next Image组件</h1>
      <ImgSize>
        <Image
          src={logoPic} //当然src支持远程获取图像但需要手动设置width height
          alt="website logo picture"
          //   priority
          layout="fill"
          // width={500} automatically provided
          // height={500} automatically provided
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      </ImgSize>
      <Image
        src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.4b76de4f.png&w=640&q=75"
        alt="unknow"
      />
    </div>
  );
}

const ImgSize = styled.div`
  width: 100vw;
  background-color: #0066cc;
  height: 512px;
  position: relative;
  /* display:block; */
`;

export default img;
