import { useEffect, useState } from "react";
import classNames from "classnames";
import Layout from "../../layouts/Layout";
import styles from "./RecordList.module.scss";
import RecordModal from "./RecordModal";

import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import Loader from "../../components/loader/Loader";
import moment from "moment";
import { Group } from "../user_groups/UserGroups";
import RecordRow from "./RecordRow";
import { useNavigate } from "react-router-dom";
import { authCheck } from "../../helpers/authCheck";

export type recordType = {
  id: string;
  date: string;
  eventName: string;
  userGroupId: string;
  userGroup?: string;
  quantity: number;
  paperType: string;
  size: string;
  requester: string;
};

const RecordList = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const [data, setData] = useState<recordType[]>([]);
  const [userGroupData, setUserGroupData] = useState<Group[]>([]);
  const [projectFilter, setProjectFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const handleOpen = () => setIsModal(true);
  const link = "https://desolate-retreat-50772.herokuapp.com/api";

  const navigate = useNavigate();

  useEffect(() => {
    authCheck(navigate);
    fetchData();
  }, [reload]);

  // Calculate the years from 2021 and create a year list for filter
  const yearList = (): number[] => {
    const yearFrom: number = moment("2021").year();
    const yearNow: number = moment().year();
    const yearList = [];
    for (let i = yearFrom; i <= yearNow; i++) {
      yearList.push(i);
    }
    return yearList;
  };

  //Fetching data from User Group and Print Record
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${link}/print`);
      const userGroupRes = await axios.get(`${link}/usergroup`);
      setUserGroupData(userGroupRes.data);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  //Replace the User Group ID with User Group slug
  data.map((item: recordType) => {
    userGroupData.forEach((group) => {
      if (item.userGroupId === group.id) {
        item.userGroup = group.slug;
      }
    });
  });

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
                {yearList().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
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
                {userGroupData.map((group) => (
                  <option key={group.id} value={group.slug}>
                    {group.slug}
                  </option>
                ))}
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
              .map((row) => (
                <RecordRow
                  key={row.id}
                  row={row}
                  reload={reload}
                  setReload={setReload}
                />
              ))}
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
