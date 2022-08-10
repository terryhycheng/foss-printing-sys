import React, { FC, useState } from "react";
import classNames from "classnames";
import styles from "./UserBox.module.scss";
import axios from "axios";
import { Group } from "./UserGroups";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

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
  const link = "http://localhost:5000/user_group";

  const onUnarchive = async (id: number) => {
    await axios.patch(`${link}/${id}`, {
      archive: false,
    });
    setReload(!reload);
  };
  const onDelete = async (id: number) => {
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
          {row.archive ? (
            <Tooltip title="Unarchive">
              <div
                className={classNames(styles.icon_wrapper)}
                onClick={() => onUnarchive(row.id)}
              >
                <UnarchiveIcon />
              </div>
            </Tooltip>
          ) : (
            <>
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
            </>
          )}
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
