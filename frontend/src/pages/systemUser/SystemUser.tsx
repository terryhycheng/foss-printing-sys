import styles from "./SystemUser.module.scss";
import Layout from "../../layouts/Layout";
import classNames from "classnames";

const SystemUser = () => {
  return (
    <Layout>
      <div className={classNames(styles.main_container)}>
        <h2>System User</h2>
      </div>
    </Layout>
  );
};

export default SystemUser;
