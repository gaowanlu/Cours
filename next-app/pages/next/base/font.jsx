import { Head } from "next/head";
import styled from "styled-components";

export default function Page() {
  return (
    <>
      {/* 在html head内自定义内容 或者在 _document.js进行添加 */}
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head> */}
      <p>Hello world!</p>
      <p>配置_document.js用于styled-components适配Next </p>
      <a
        href="https://styled-components.com/docs/advanced#server-side-rendering"
        target="_blank"
        rel="noreferrer"
      >
        styled-components给出的解决方案
        https://styled-components.com/docs/advanced#server-side-rendering
      </a>
      <FlexCenter>COURS-NEXT-APP STYLED-COMPONENTS</FlexCenter>
    </>
  );
}

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  padding: 2rem;
  font-weight: bold;
`;
