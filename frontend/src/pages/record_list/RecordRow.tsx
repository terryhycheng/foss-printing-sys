import { Tooltip } from "@mui/material";
import classNames from "classnames";
import moment from "moment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import styles from "./RecordList.module.scss";
import axios from "axios";
import { recordType } from "./RecordList";
import RecordModal from "./RecordModal";

type RecordRowType = {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  row: recordType;
};

const RecordRow = ({ reload, setReload, row }: RecordRowType) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleOpen = () => setIsModal(true);

  const link = "http://terryhycheng.com:8088/api";

  const onDelete = async (id: string) => {
    await axios.delete(`${link}/print/${id}`);
    setReload(!reload);
  };
  return (
    <>
      <div key={row.id} className={classNames(styles.grid, styles.row)}>
        <strong>{moment(row.date).format("DD MMM YYYY")}</strong>
        <p>{row.eventName}</p>
        <strong>{row.userGroup}</strong>
        <p>{row.quantity}</p>
        <Tooltip title={row.paperType} placement="top-start">
          <p>{row.size}</p>
        </Tooltip>
        <p>{row.requester}</p>
        <div className={classNames(styles.action_wrapper)}>
          <div className={classNames(styles.icon_wrapper)} onClick={handleOpen}>
            <EditIcon />
          </div>
          <div
            className={classNames(styles.icon_wrapper, styles.delete)}
            onClick={() => onDelete(row.id)}
          >
            <DeleteOutlineIcon />
          </div>
        </div>
      </div>
      <RecordModal
        isModal={isModal}
        setIsModal={setIsModal}
        row={row}
        reload={reload}
        setReload={setReload}
      />
    </>
  );
};

export default RecordRow;
