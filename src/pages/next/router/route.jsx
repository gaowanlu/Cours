import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/*next中为单页面程序*/
function route() {
  const router = useRouter();
  return (
    <div>
      <h1>next 路由</h1>
      <p>自动索引目录/嵌套路由/动态路由</p>
      <p>
        要匹配动态段，您可以使用括号语法。这允许您匹配命名参数。 <br />
        pages/blog/[slug].js→ /blog/:slug( /blog/hello-world) <br />
        pages/[username]/settings.js→ /:username/settings( /foo/settings) <br />
        pages/post/[...all].js→ /post/*( /post/2020/id/title) <br />
      </p>
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
        doc https://nextjs.org/docs/api-reference/next/router#userouter{" "}
      </p>
    </div>
  );
}

export default route;
