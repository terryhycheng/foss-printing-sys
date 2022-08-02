import React from "react";

type Children = {
  children: React.ReactNode;
};

const Layout = ({ children }: Children) => {
  return (
    <>
      <div>Menu</div>
      <div>Header</div>
      <div>{children}</div>
    </>
  );
};

export default Layout;
