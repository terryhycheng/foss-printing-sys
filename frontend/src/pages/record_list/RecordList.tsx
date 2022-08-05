import { useState } from "react";
import classNames from "classnames";
import Layout from "../../layouts/Layout";
import styles from "./RecordList.module.scss";
import RecordModal from "./RecordModal";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { rows } from "./data";

const RecordList = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleOpen = () => setIsModal(true);

  const onDelete = (id: Number) => console.log(id);

  return (
    <Layout>
      <div className={classNames(styles.main_container)}>
        <div className={classNames(styles.title_container)}>
          <h2>Print Record List</h2>
          <button onClick={handleOpen} className={classNames(styles.btn)}>
            <AddIcon />
            Add Print Record
          </button>
        </div>
        <div>
          <h3>Filters</h3>
        </div>
        <div className={classNames(styles.table)}>
          <div className={classNames(styles.grid, styles.header)}>
            <h4>Date</h4>
            <h4>Event Name</h4>
            <h4>User Group</h4>
            <h4>Quantity</h4>
            <h4>Size</h4>
            <h4>Requester</h4>
            <h4>Actions</h4>
          </div>
          {rows.map((row) => (
            <div key={row.id} className={classNames(styles.grid, styles.row)}>
              <p>{row.date}</p>
              <p>{row.eventName}</p>
              <p>{row.userGroup}</p>
              <p>{row.quantity}</p>
              <p>{row.size}</p>
              <p>{row.requester}</p>

              <div
                className={classNames(styles.icon_wrapper, styles.delete)}
                onClick={() => onDelete(row.id)}
              >
                <DeleteOutlineIcon />
              </div>
            </div>
          ))}
        </div>
        {/* ---- Modal ---- */}
        <RecordModal isModal={isModal} setIsModal={setIsModal} />
      </div>
    </Layout>
  );
};

export default RecordList;
