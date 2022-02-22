import React from "react";

function Index(props) {
  return (
    <div>
      <h1>NEXT.js Part1 - {props.runtimeId}</h1>
      <h2>
        1、不带数据的静态页面 SSG Static Site Generation/Static Generation
      </h2>
      <p>
        其HTML所显示的内容内有从外部获取、像也了一个不变的HTML文件一样,则不用做任何处理.
        其构建时页面渲染内容已经被定义死了,使用场景如 产品渲染页
        前端构建完就不变了 需要变就是下一版 你可以访问 /next/part1/1 or
        /next/part1/1 静态生成了两个静态页面 可以被CDN缓存
      </p>
      <p>id: {props.id}</p>
      <p>runtimeId: {props.runtimeId}</p>
    </div>
  );
}

// 此函数在构建时被调用
export async function getStaticProps(context) {
  // const res = await fetch("https://.../posts");
  // const posts = await res.json();
  /*返回给Index组件作为入口参数 服务端代理数据请求
    组件则负责将数据渲染出来 返回给客户端HTML
  */
  const { params } = context;
  if (0) {
    //重定向
    return {
      redirect: {
        destination: "https://www.baidu.com",
        permanent: false,
      },
    };
  }
  return {
    props: {
      id: "HELLO NEXT",
      runtimeId: params.id,
    },
    // notFound:true 返回404 not found page
    revalidate: 10,
    //增量静态重新生成 (ISR) 使您能够在每页的基础上使用静态生成，而无需重建整个站点 In seconds
    //没有被预渲染的配和fallback将会被渲染 则会产生缓存 缓存时间为10s
  };
}

// 此函数在构建时被调用  设定可要预渲染的参数 id
// /next/[id].js
export async function getStaticPaths() {
  // 调用外部 API 获取博文列表
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()
  const posts = [{ id: "1" }, { id: "2" }]; //需要预渲染的id
  //则会提前预渲染出 /next/1 /next/2 两个页面
  // 据博文列表生成所有需要预渲染的路径
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  // fallback:blocking 则会当请求例如 id=4时没有 则会进行生成
  return { paths, fallback: "blocking" };
}

export default Index;
