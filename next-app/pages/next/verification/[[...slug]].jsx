import React from "react";

function Page(props) {
  return (
    <div>
      <h1>身份校验verification</h1>
    </div>
  );
}

export const getServerSideProps = (context) => {
  console.log("REQUEST", context.req.method);
  return {
    redirect: {
      destination: "/next/login",
      permanent: false,
    },
  };
  return {
    props: { user },
  };
};

export default Page;
