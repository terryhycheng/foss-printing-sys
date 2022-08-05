import classNames from "classnames";
import styles from "./PrinterInfo.module.scss";
import Layout from "../../layouts/Layout";

const PrinterInfo = () => {
  return (
    <Layout>
      <div className={classNames(styles.main_container)}>
        <h2>Printer Info</h2>
      </div>
    </Layout>
  );
};

export default PrinterInfo;
