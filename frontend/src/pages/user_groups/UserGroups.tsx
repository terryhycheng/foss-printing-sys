import React, { FC, useState } from "react";
import classNames from "classnames";
import Layout from "../../layouts/Layout";
import styles from "./UserGroups.module.scss";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

import Tooltip from "@mui/material/Tooltip";
import UserGroupModal from "./UserGroupModal";

type Group = {
  id: Number;
  slug: String;
  FullName: String;
  archive: boolean;
};

const list: Group[] = [
  {
    id: 1,
    slug: "JCECC",
    FullName: "Jockey Club End-of-Life Community Care Project",
    archive: false,
  },
  {
    id: 2,
    slug: "Faculty",
    FullName: "Faculty of Social Sciences",
    archive: true,
  },
];

const MessageBox: FC = () => {
  return (
    <div className={classNames(styles.box, styles.msgBox)}>
      <p>No item in this list</p>
    </div>
  );
};

const UserBox: FC<Group> = ({ id, slug, FullName, archive }) => {
  return (
    <div key={id as React.Key} className={classNames(styles.box)}>
      <div className={classNames(styles.left)}>
        <h2>{slug}</h2>
        <p>{FullName}</p>
      </div>
      <div className={classNames(styles.right)}>
        {archive ? (
          <Tooltip title="Unarchive">
            <div className={classNames(styles.icon_wrapper)}>
              <UnarchiveIcon />
            </div>
          </Tooltip>
        ) : (
          <>
            <Tooltip title="Edit">
              <div className={classNames(styles.icon_wrapper)}>
                <EditIcon />
              </div>
            </Tooltip>
            <Tooltip title="Archive">
              <div className={classNames(styles.icon_wrapper)}>
                <ArchiveIcon />
              </div>
            </Tooltip>
            <Tooltip title="Delete">
              <div className={classNames(styles.icon_wrapper, styles.delete)}>
                <DeleteOutlineIcon />
              </div>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};

const UserGroups: FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleOpen = () => setIsModal(true);

  const onDelete = (id: Number) => console.log(id);

  return (
    <Layout>
      <div className={classNames(styles.main_container)}>
        <div className={classNames(styles.title_container)}>
          <h2>User Groups</h2>
          <button className={classNames(styles.btn)} onClick={handleOpen}>
            <AddIcon />
            Add User Group
          </button>
        </div>
        <div className={classNames(styles.table)}>
          <h2>Active</h2>
          {list.length ? (
            list.map((row) => !row.archive && <UserBox {...row} />)
          ) : (
            <MessageBox />
          )}
        </div>
        <div className={classNames(styles.table)}>
          <h2>Archived</h2>
          {list.length ? (
            list.map((row) => row.archive && <UserBox {...row} />)
          ) : (
            <MessageBox />
          )}
        </div>
        <UserGroupModal isModal={isModal} setIsModal={setIsModal} />
      </div>
    </Layout>
  );
};

export default UserGroups;
