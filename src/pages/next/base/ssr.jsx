import React from "react";
import useSWR from "swr";
import ssrStyle from "./ssr.module.css";
/*next配和sass*/
import variables from "../../../styles/variables.module.scss";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function SSR(props) {
  const { data, error } = useSWR(
    "http://api.tianapi.com/generalnews/index?key=02ce1054a16c3542c96149694a172831",
    fetcher
  );
  console.log(data, error);
  return (
    <div>
      <h1 style={{ backgroundColor: variables.primaryColor }}>
        SSR Server-Side Rendering
      </h1>
      <p>服务端渲染 每次请求时重新生成新的HTML</p>
      <p>当然SRR会消耗服务端资源</p>
      <p>props.data:= {props.data}</p>
      <p className={`${ssrStyle.bold} ${ssrStyle.p}`}>
        使用module.css :对于需要客户端开进行处理的内容，则写到useEffect
        或者使用useSER
      </p>
      <ul>
        {data &&
          data.newslist &&
          data.newslist.map((o, i, a) => {
            return <li key={o.id}>{o.title}</li>;
          })}
      </ul>
    </div>
  );
}

// 路由每次被请求 执行得到页面的props
export async function getServerSideProps() {
  // Fetch data from external API
  //   const res = await fetch(`https://.../data`);
  //   const data = await res.json();
  let random_num = Math.random();
  // Pass data to the page via props
  return {
    props: {
      data: random_num.toString(),
    },
  };
}

export default SSR;
