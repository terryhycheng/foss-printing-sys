import classNames from "classnames";
import React from "react";
import Header from "../components/header/Header";
import Menu from "../components/menu/Menu";
import styles from "./Layout.module.scss";

type Children = {
  children: React.ReactNode;
};

const Layout = ({ children }: Children) => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.menu_wrapper)}>
        <Menu />
      </div>
      <div className={classNames(styles.content_wrapper)}>
        <div className={classNames(styles.header_wrapper)}>
          <Header />
        </div>
        <div className={classNames(styles.children_wrapper)}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
