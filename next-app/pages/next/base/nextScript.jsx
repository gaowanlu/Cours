import React from "react";
import Script from "next/script";

function nextScript() {
  return (
    <>
      <h1>Next Script组件</h1>
      <Script
        src="https://www.google-analytics.com/analytics.js"
        strategy="lazyOnload"
      />
      <p>
          beforeInteractive：在页面交互之前加载 <br/>
          afterInteractive: (默认):页面变为交互式后立即加载 <br />
          lazyOnload: 在空闲时间加载
      </p>
    </>
  );
}

export default nextScript;
