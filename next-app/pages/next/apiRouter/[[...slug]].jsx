import React from "react";
import useSWR from "swr";
function Page() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/user?id=234343&uis=cfdhvbfjd", fetcher);
  console.log(data);
  return (
    <>
      <h1>API路由</h1>
      <p>将共有的信息提取出去 可以为vercel等云函数服务使用做的准备</p>
      <p>{JSON.stringify(data)}</p>
      <p>
        API路由同样与next router的相同支持动态路由使用方式大致相同 使用req
        object进行query的获取
      </p>
      <a
        target="_blank"
        href="https://nextjs.org/docs/api-routes/dynamic-api-routes"
      >
        https://nextjs.org/docs/api-routes/dynamic-api-routes
      </a>
    </>
  );
}

export default Page;
