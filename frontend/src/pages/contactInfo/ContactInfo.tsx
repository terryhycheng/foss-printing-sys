import classNames from "classnames";
import styles from "./ContactInfo.module.scss";
import Layout from "../../layouts/Layout";

import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import ContactModal from "./ContactModal";
import axios from "axios";
import Loader from "../../components/loader/Loader";

export type ContactInfoType = {
  id: number;
  type: string;
  title: string;
  content: string;
  link?: string;
};

const ContactInfo = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ContactInfoType[]>([]);
  const handleOpen = () => setIsModal(true);

  const link = "http://localhost:5001/api/contact";

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
            <h2>Contact Information</h2>
            <button className={classNames(styles.btn)} onClick={handleOpen}>
              <EditIcon />
              Edit
            </button>
          </div>
          <h2 className={classNames(styles.title)}>Useful Form</h2>
          <div className={classNames(styles.card)}>
            {data.map(
              (item) =>
                item.type === "form" && (
                  <div key={item.id} className={classNames(styles.form_box)}>
                    <h4>{item.title}</h4>
                    <a
                      className={classNames(styles.btn)}
                      href={item.content}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download
                    </a>
                  </div>
                )
            )}
          </div>
          <h2 className={classNames(styles.title)}>Contact Person</h2>
          <div className={classNames(styles.card)}>
            {data.map(
              (item) =>
                item.type === "contact_person" && (
                  <div key={item.id} className={classNames(styles.info_box)}>
                    <h4>{item.title} :</h4>
                    <p>{item.content}</p>
                  </div>
                )
            )}
          </div>
          <h2 className={classNames(styles.title)}>About Canon</h2>
          <div className={classNames(styles.card)}>
            {data.map(
              (item) =>
                item.type === "canon" && (
                  <div key={item.id} className={classNames(styles.info_box)}>
                    <h4>{item.title} :</h4>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer">
                        {item.content}
                      </a>
                    ) : (
                      <p>{item.content}</p>
                    )}
                  </div>
                )
            )}
          </div>
          {isModal && (
            <ContactModal
              isModal={isModal}
              setIsModal={setIsModal}
              data={data}
              reload={reload}
              setReload={setReload}
            />
          )}
        </div>
      )}
      {isLoading && <Loader />}
    </Layout>
  );
};

export default ContactInfo;
