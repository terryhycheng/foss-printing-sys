import classNames from "classnames";
import styles from "./RecordModal.module.scss";

import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import moment from "moment";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Group } from "../user_groups/UserGroups";
import { InventoryDataType } from "../inventory/Inventory";

const paperType = ["A1", "A2", "A3"];

type Props = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecordModal: React.FC<Props> = ({
  isModal,
  setIsModal,
  reload,
  setReload,
}) => {
  const handleClose = () => setIsModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<Group[]>([]);
  const [inventoryData, setInventoryData] = useState<InventoryDataType[]>([]);
  const { register, handleSubmit, reset } = useForm();

  const link = "http://localhost:5001/api/print";

  useEffect(() => {
    fetchUserGroup();
  }, []);

  const fetchUserGroup = async () => {
    const data = await axios.get("http://localhost:5001/api/usergroup");
    const paperData = await axios.get(
      "http://localhost:5001/api/inventory/paper_roll"
    );
    setList(data.data);
    setInventoryData(paperData.data);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    try {
      await axios.post(link, data);
    } catch (error) {
      console.error(error);
    }
    setReload(!reload);
    reset();
    handleClose();
    setIsLoading(false);
  };

  return (
    <Modal
      open={isModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={classNames(styles.modal_container)}>
        <h2>Add Print Record</h2>
        <form className={classNames()} onSubmit={handleSubmit(onSubmit)}>
          <div className={classNames(styles.select_box)}>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              defaultValue={moment().format("yyyy-MM-DD")}
              type="date"
              {...register("date", { required: true })}
            />
          </div>
          <div className={classNames(styles.select_box)}>
            <label htmlFor="event">Project/Event Name</label>
            <input
              id="event"
              type="text"
              {...register("eventName", { required: true })}
            />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={classNames(styles.select_box)}>
              <label htmlFor="userGroup">User Group</label>
              <select
                id="userGroup"
                defaultValue=""
                className={classNames(styles.select_box)}
                {...register("userGroupId", { required: true })}
              >
                <option disabled value="">
                  Please select
                </option>
                {list.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.slug}
                  </option>
                ))}
              </select>
            </div>
            <div className={classNames(styles.select_box)}>
              <label htmlFor="requester">Requester</label>
              <input
                id="requester"
                type="text"
                {...register("requester", { required: true })}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={classNames(styles.select_box)}>
              <label htmlFor="paperSize">Paper Size</label>
              <select
                id="paperSize"
                defaultValue=""
                className={classNames(styles.select_box)}
                {...register("size", { required: true })}
              >
                <option disabled value="">
                  Please select
                </option>
                {paperType.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className={classNames(styles.select_box)}>
              <label htmlFor="quantity">Quantity</label>
              <input
                id="qty"
                type="number"
                step="0.5"
                {...register("quantity", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <div className={classNames(styles.select_box)}>
            <label htmlFor="paperType">Paper Type</label>
            <select
              id="paperType"
              defaultValue=""
              className={classNames(styles.select_box)}
              {...register("paperType", { required: true })}
            >
              <option disabled value="">
                Please select
              </option>
              {inventoryData.map(
                (option) =>
                  option.type === "paper_roll" && (
                    <option key={option.code} value={option.name}>
                      {option.name}
                    </option>
                  )
              )}
            </select>
          </div>
          {isLoading ? (
            <input
              disabled
              className={classNames(styles.btn, styles.submit, styles.loading)}
              type="submit"
            />
          ) : (
            <input
              className={classNames(styles.btn, styles.submit)}
              type="submit"
            />
          )}
        </form>
      </div>
    </Modal>
  );
};

export default RecordModal;
