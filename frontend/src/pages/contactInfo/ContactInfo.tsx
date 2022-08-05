import classNames from "classnames";
import styles from "./ContactInfo.module.scss";
import Layout from "../../layouts/Layout";

const ContactInfo = () => {
  return (
    <Layout>
      <div className={classNames(styles.main_container)}>
        <h2>Contact Info</h2>
      </div>
    </Layout>
  );
};

export default ContactInfo;
