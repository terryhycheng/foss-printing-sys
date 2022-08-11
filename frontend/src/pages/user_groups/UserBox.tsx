import React, { FC, useState } from "react";
import classNames from "classnames";
import styles from "./UserBox.module.scss";
import axios from "axios";
import { Group } from "./UserGroups";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Tooltip from "@mui/material/Tooltip";
import UserGroupModal from "./UserGroupModal";

type PropsType = {
  key: React.Key;
  row: Group;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserBox: FC<PropsType> = ({ row, reload, setReload }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleOpen = () => setIsModal(true);
  const link = "http://terryhycheng.com:8088/api/usergroup";

  const onDelete = async (id: string) => {
    await axios.delete(`${link}/${id}`);
    setReload(!reload);
  };

  return (
    <>
      <div className={classNames(styles.box)}>
        <div className={classNames(styles.left)}>
          <h2>{row.slug}</h2>
          <p>{row.FullName}</p>
        </div>
        <div className={classNames(styles.right)}>
          <Tooltip title="Edit">
            <div
              className={classNames(styles.icon_wrapper)}
              onClick={handleOpen}
            >
              <EditIcon />
            </div>
          </Tooltip>
          <Tooltip title="Delete">
            <div
              className={classNames(styles.icon_wrapper, styles.delete)}
              onClick={() => onDelete(row.id)}
            >
              <DeleteOutlineIcon />
            </div>
          </Tooltip>
        </div>
      </div>
      {isModal && (
        <UserGroupModal
          isModal={isModal}
          setIsModal={setIsModal}
          reload={reload}
          row={row}
          setReload={setReload}
        />
      )}
    </>
  );
};
