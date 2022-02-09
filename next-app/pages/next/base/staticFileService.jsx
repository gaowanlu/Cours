import React from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Page() {
  const { data, error } = useSWR("/manifest.json", fetcher);
  return (
    <div>
      <h1>静态资源 next提供public文件访问的服务 </h1>
      <p>如 public/logo.png 则可以通过 utl /logo.png 进行访问</p>
      {data && <p>website name {data.name}</p>}
    </div>
  );
}
export async function getStaticProps() {
  console.log(process.env.ME_NAME); //next 自动加载环境变量 .env.local into process.env
  return {
    props: {},
  };
}
export default Page;
