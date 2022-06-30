import React from "react";
import styled from "styled-components";

/**
 * 老虎滑动选择暂时周数组件 用于 周课表暂时调节周数
 * @param {*} props
 * @returns
 */
function TigerSelectNum(props) {
  const slideDOM = React.useRef(null);
  React.useEffect(() => {
    slideDOM.current.addEventListener("scroll", (e) => {
      e.preventDefault();
      //   console.log([
      //     e.target.scrollHeight,
      //     e.target.scrollTop + e.target.clientHeight,
      //   ]);
      let index =
        25 -
        Math.round(
          (e.target.scrollHeight -
            (e.target.scrollTop + e.target.clientHeight)) /
            36.0
        );
      props.setNowIndex(index);
    });
  });
  const array = [];
  for (let i = 1; i < 28; i++) {
    array.push({ index: i, id: i });
  }
  return (
    <Slide ref={slideDOM} left={props.left} bottom={props.bottom}>
      {array.map((o) => {
        return <li key={o.id}>🐅</li>;
      })}
    </Slide>
  );
}

const Slide = styled.ul`
  position: absolute;
  bottom: ${(props) => (props.bottom ? props.bottom : "50vh")};
  left: ${(props) => (props.left ? props.left : "0rem")};
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

export default TigerSelectNum;
