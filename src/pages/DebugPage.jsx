import React from "react";
import useAssembly from "../utils/useAssembly";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import PageNavigationBar from "../components/PageNavigationBar";

function DebugPage() {
  const [assembly] = useAssembly("/assembly/main.wasm");
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(0);
  const [c, setC] = React.useState(0);
  //   if (assembly) {
  //     console.log(assembly.instance.exports.add(111, 222));
  //     let result = assembly.instance.exports.add(111, 222);
  //     console.log(typeof result);
  //   }
  return (
    <PageContainer>
      <PageNavigationBar title="Assembly" backTitle="OS" backPath="/other/" />
      <PageHeader title="WebAssembly" />
      <PageHeader
        title={`assembly.instance.exports.add(${a}, ${b}) = ${c}`}
        color="var(--color-primary)"
        size={1}
      />
      <input
        style={{
          width: "100%",
          marginTop: "1rem",
          height: "2rem",
          background: "var(--color-background-front)",
          color: "var(--color-color)",
        }}
        type="number"
        onChange={(e) => {
          setA(parseInt(e.target.value));
        }}
        value={a}
      />
      <PageHeader title={`+`} />
      <input
        style={{
          width: "100%",
          height: "2rem",
          background: "var(--color-background-front)",
          color: "var(--color-color)",
        }}
        type="number"
        onChange={(e) => {
          setB(parseInt(e.target.value));
        }}
        value={b}
      />
      <PageHeader title={`= ${c}`} />
      <button
        style={{
          width: "100%",
          marginTop: "1rem",
          height: "2rem",
          background: "var(--color-background-front)",
          color: "var(--color-color)",
        }}
        onClick={(e) => {
          setC(assembly.instance.exports.add(a, b));
        }}
      >
        计算
      </button>
    </PageContainer>
  );
}

export default DebugPage;
