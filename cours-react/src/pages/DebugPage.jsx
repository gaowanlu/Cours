import React from "react";
import styled from "styled-components";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";

function SelectNum(props) {
  const slideDOM = React.useRef(null);
  React.useEffect(() => {
    slideDOM.current.addEventListener("scroll", (e) => {
      e.preventDefault();
      //   console.log([
      //     e.target.scrollHeight,
      //     e.target.scrollTop + e.target.clientHeight,
      //   ]);
      let index =
        21 -
        Math.round(
          (e.target.scrollHeight -
            (e.target.scrollTop + e.target.clientHeight)) /
            34.0
        );
      props.setNowIndex(index);
    });
  });
  const array = [];
  for (let i = 1; i < 22; i++) {
    array.push({ index: i, id: i });
  }
  return (
    <Slide ref={slideDOM}>
      {array.map((o) => {
        return <li key={o.id}>🐅</li>;
      })}
    </Slide>
  );
}

function DebugPage() {
  const [nowIndex, setNowIndex] = React.useState(1);
  return (
    <PageContainer>
      <PageHeader title="DebugPage" />
      <SelectNum setNowIndex={setNowIndex} />
      <h2>{nowIndex}</h2>
    </PageContainer>
  );
}

const Slide = styled.ul`
  position: absolute;
  bottom: 50vh;
  left: 0rem;
  display: block;
  width: 4rem;
  height: 48px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    width: 1px;
  }
  &:hover {
    cursor: pointer;
  }
  & > li {
    text-align: center;
    padding: calc(8px + 0.1rem);
    font-size: 0.8rem;
    color: green;
    scroll-snap-align: center;
    font-weight: bolder;
  }
`;

export default DebugPage;
export { SelectNum };
