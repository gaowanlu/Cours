import Head from "next/head";

export default function Page() {
  return (
    <div>
      {/* 在html head内自定义内容 或者在 _document.js进行添加 */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>
      <p>Hello world!</p>
    </div>
  );
}
