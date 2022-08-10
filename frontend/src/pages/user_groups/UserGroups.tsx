import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import Layout from "../../layouts/Layout";
import styles from "./UserGroups.module.scss";

import AddIcon from "@mui/icons-material/Add";

import UserGroupModal from "./UserGroupModal";
import { UserBox } from "./UserBox";
import axios from "axios";
import Loader from "../../components/loader/Loader";

export type Group = {
  id: number;
  slug: string;
  FullName: string;
  archive: boolean;
};

const MessageBox: FC = () => {
  return (
    <div className={classNames(styles.box, styles.msgBox)}>
      <p>No item in this list</p>
    </div>
  );
};

const UserGroups: FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const [data, setData] = useState<Group[]>([]);
  const handleOpen = () => setIsModal(true);
  const link = "http://localhost:5000/user_group";

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(link);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      {!isLoading && (
        <div className={classNames(styles.main_container)}>
          <div className={classNames(styles.title_box)}>
            <h2>User Groups</h2>
            <button className={classNames(styles.btn)} onClick={handleOpen}>
              <AddIcon />
              Add User Group
            </button>
          </div>
          <div className={classNames(styles.table)}>
            <h2>Active</h2>
            {data.length ? (
              data.map(
                (row) =>
                  !row.archive && (
                    <UserBox
                      key={row.id as React.Key}
                      row={row}
                      reload={reload}
                      setReload={setReload}
                    />
                  )
              )
            ) : (
              <MessageBox />
            )}
          </div>
        </div>
      )}
      {isLoading && <Loader />}
      {isModal && (
        <UserGroupModal
          isModal={isModal}
          setIsModal={setIsModal}
          reload={reload}
          setReload={setReload}
        />
      )}
    </Layout>
  );
};

export default UserGroups;
