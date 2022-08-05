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
        <div className={classNames(styles.filter_wrapper, styles.table)}>
          <h3>Filters</h3>
          <div className={classNames(styles.select_box)}>
            <label htmlFor="byYear">Year</label>
            <select name="byYear" id="byYear" defaultValue="">
              <option value="">All</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
          <div className={classNames(styles.select_box)}>
            <label htmlFor="byYear">Project</label>
            <select name="byYear" id="byYear" defaultValue="">
              <option value="">All</option>
              <option value="faculty">Faculty</option>
              <option value="jcecc">JCECC</option>
              <option value="jcwise">JCWISE</option>
            </select>
          </div>
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
