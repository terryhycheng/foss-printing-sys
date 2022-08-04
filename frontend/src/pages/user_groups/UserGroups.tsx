import classNames from "classnames";
import Layout from "../../layouts/Layout";
import styles from "./UserGroups.module.scss";

import AddIcon from "@mui/icons-material/Add";

const UserGroups = () => {
  return (
    <Layout>
      <div className={classNames(styles.main_container)}>
        <div className={classNames(styles.title_container)}>
          <h2>User Groups</h2>
          <button className={classNames(styles.btn)}>
            <AddIcon />
            Add User Group
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UserGroups;
