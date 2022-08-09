import { useEffect, useState } from "react";
import classNames from "classnames";
import Layout from "../../layouts/Layout";
import styles from "./RecordList.module.scss";
import RecordModal from "./RecordModal";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import axios from "axios";
import Loader from "../../components/loader/Loader";
import moment from "moment";

export type recordType = {
  id: number;
  date: string;
  eventName: string;
  userGroup: string;
  quantity: number;
  size: string;
  requester: string;
};

const RecordList = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const [data, setData] = useState<recordType[]>([]);
  const [projectFilter, setProjectFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const handleOpen = () => setIsModal(true);
  const link = "http://localhost:5000/print";

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

  const onDelete = async (id: Number) => {
    await axios.delete(`${link}/${id}`);
    setReload(!reload);
  };

  return (
    <Layout>
      {!isLoading && (
        <div className={classNames(styles.main_container)}>
          <div className={classNames(styles.title_box)}>
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
              <select
                name="byYear"
                id="byYear"
                defaultValue=""
                onChange={(e) => {
                  setYearFilter(e.target.value);
                }}
              >
                <option value="">All</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
            <div className={classNames(styles.select_box)}>
              <label htmlFor="byYear">Project</label>
              <select
                name="byYear"
                id="byYear"
                defaultValue=""
                onChange={(e) => {
                  setProjectFilter(e.target.value);
                }}
              >
                <option value="">All</option>
                <option value="Faculty">Faculty</option>
                <option value="JCECC">JCECC</option>
                <option value="JCWISE">JCWISE</option>
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
            {data
              .filter((val) => {
                if (projectFilter === "") {
                  return val;
                } else {
                  return val.userGroup === projectFilter;
                }
              })
              .filter((val) => {
                if (yearFilter === "") {
                  return val;
                } else {
                  return moment(val.date).year().toString() === yearFilter;
                }
              })
              .map(
                (row) =>
                  true && (
                    <div
                      key={row.id}
                      className={classNames(styles.grid, styles.row)}
                    >
                      <p>{row.date}</p>
                      <p>{row.eventName}</p>
                      <p>{row.userGroup}</p>
                      <p>{row.quantity}</p>
                      <p>{row.size}</p>
                      <p>{row.requester}</p>
                      <div
                        className={classNames(
                          styles.icon_wrapper,
                          styles.delete
                        )}
                        onClick={() => onDelete(row.id)}
                      >
                        <DeleteOutlineIcon />
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      )}
      {isLoading && <Loader />}
      {/* ---- Modal ---- */}
      <RecordModal
        isModal={isModal}
        setIsModal={setIsModal}
        reload={reload}
        setReload={setReload}
      />
    </Layout>
  );
};

export default RecordList;
