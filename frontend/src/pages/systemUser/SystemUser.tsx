import styles from "./SystemUser.module.scss";
import Layout from "../../layouts/Layout";
import classNames from "classnames";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { Tooltip } from "@mui/material";
import { users } from "../../data/users";

const SystemUser = () => {
  return (
    <Layout>
      <div className={classNames(styles.main_container)}>
        <div className={classNames(styles.title_box)}>
          <h2>System Users</h2>
          <button className={classNames(styles.btn)}>
            <AddIcon />
            Add New User
          </button>
        </div>
        <div>
          <div className={classNames(styles.row_title)}>
            <p>User Name</p>
            <p>Email Address</p>
            <p>Actions</p>
          </div>
          <hr />
        </div>
        {users.map((item) => (
          <div key={item.id} className={classNames(styles.card)}>
            <h4>{item.name}</h4>
            <p>{item.email}</p>
            <div className={classNames(styles.action_box)}>
              <Tooltip title="Delete Account">
                <div className={classNames(styles.icon_wrapper, styles.delete)}>
                  <DeleteOutlineIcon />
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default SystemUser;
