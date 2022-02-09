//nextjs 全局样式单导入
// import '../index.css';
// This default export is required in a new `pages/_app.js` file
//对于非全局css 则在组件内按需导入即可.
//相当于CSR的App.jsx 在这里可以对页面进行公共的布局等
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
