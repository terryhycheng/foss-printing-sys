import classNames from "classnames";
import styles from "./PrinterInfo.module.scss";
import Layout from "../../layouts/Layout";
import axios from "axios";

import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import PrinterModal from "./PrinterModal";

export type PrinterInfoType = {
  id: number;
  type: string;
  title: string;
  content: string;
  link?: string;
};

const PrinterInfo = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const [data, setData] = useState<PrinterInfoType[]>([]);
  const handleOpen = () => setIsModal(true);
  const link = "http://localhost:5000/printer";

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
            <h2>Printer Information</h2>
            <button className={classNames(styles.btn)} onClick={handleOpen}>
              <EditIcon />
              Edit
            </button>
          </div>
          <h2 className={classNames(styles.title)}>Basic Information</h2>
          <div className={classNames(styles.card)}>
            {data.map(
              (item) =>
                item.type === "basic_info" && (
                  <div key={item.id} className={classNames(styles.info_box)}>
                    <h4>{item.title} :</h4>
                    <p>{item.content}</p>
                  </div>
                )
            )}
          </div>
          <h2 className={classNames(styles.title)}>Useful Links</h2>
          <div className={classNames(styles.card)}>
            {data.map(
              (item) =>
                item.type === "link" && (
                  <div key={item.id} className={classNames(styles.info_box)}>
                    <h4>{item.title} :</h4>
                    <a href={item.content} target="_blank" rel="noreferrer">
                      {item.content}
                    </a>
                  </div>
                )
            )}
          </div>
        </div>
      )}
      {isLoading && <Loader />}
      {isModal && (
        <PrinterModal
          isModal={isModal}
          setIsModal={setIsModal}
          data={data}
          reload={reload}
          setReload={setReload}
        />
      )}
    </Layout>
  );
};

export default PrinterInfo;
