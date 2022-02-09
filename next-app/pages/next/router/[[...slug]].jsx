import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/*next中为单页面程序*/
function route() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h1>next 路由</h1>
      <h2>自动索引目录/嵌套路由/动态路由</h2>
      <p>
        要匹配动态段，您可以使用括号语法。这允许您匹配命名参数。 <br />
        pages/blog/[slug].js→ /blog/:slug( /blog/hello-world) <br />
        pages/[username]/settings.js→ /:username/settings( /foo/settings) <br />
        pages/post/[...all].js→ /post/*( /post/2020/id/title) <br />
      </p>
      <h2>Next/Link组件</h2>
      <Link href="/">
        <a>Next Link Component to Home Page /</a>
      </Link>
      <br />
      <Link href={`/${encodeURIComponent("")}`}>
        <a>Next Link encodeURIComponent</a>
      </Link>
      {/*use URL Object*/}
      <br />
      <Link
        href={{
          pathname: "/next/base/[slug]",
          query: { slug: "1" },
        }}
      >
        <a>Use URL Object</a>
      </Link>
      <br />
      <p>
        也可以使用React Router 的类似的useRouter router.push() 等 详情请见next
        doc
        <a
          target="_blank"
          href="https://nextjs.org/docs/api-reference/next/router#userouter"
        >
          https://nextjs.org/docs/api-reference/next/router#userouter
        </a>
      </p>
      <h2>获取query参数</h2> <p> router.query</p>
      <h2>动态路由的匹配具有优先级</h2>
      <p>
        的区分 <br />
        <a
          target="_blank"
          href="https://nextjs.org/docs/routing/dynamic-routes"
        >
          https://nextjs.org/docs/routing/dynamic-routes
        </a>
      </p>
      <h2>浅层路由</h2>
      <p>
        并不会真正的跳转 而是更改url而无需再次运行数据获取方法，
        包括getServerSideProps、getStaticProps和getInitialProps. <br />
        使用useRouter() useEffect()或者 <br />
        componentDidUpdate(prevProps) {}做出响应变化
      </p>
    </div>
  );
}

export default route;
