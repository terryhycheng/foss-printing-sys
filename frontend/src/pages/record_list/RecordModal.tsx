import classNames from "classnames";
import styles from "./RecordModal.module.scss";

import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import moment from "moment";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Group } from "../user_groups/UserGroups";
import { InventoryDataType } from "../inventory/Inventory";
import { recordType } from "./RecordList";

const paperType = ["A1", "A2", "A3"];

type Props = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  row?: recordType;
};

const RecordModal: React.FC<Props> = ({
  isModal,
  setIsModal,
  reload,
  setReload,
  row,
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
    setIsLoading(true);
    try {
      row
        ? await axios.patch(`${link}/${row.id}`, data)
        : await axios.post(link, data);
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
        <h2>{row ? "Edit Print Record" : "Add Print Record"}</h2>
        <form className={classNames()} onSubmit={handleSubmit(onSubmit)}>
          <div className={classNames(styles.select_box)}>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              defaultValue={
                row
                  ? moment(row.date).format("yyyy-MM-DD")
                  : moment().format("yyyy-MM-DD")
              }
              type="date"
              {...register("date", { required: true })}
            />
          </div>
          <div className={classNames(styles.select_box)}>
            <label htmlFor="event">Project/Event Name</label>
            <input
              id="event"
              type="text"
              defaultValue={row ? row.eventName : ""}
              {...register("eventName", { required: true })}
            />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={classNames(styles.select_box)}>
              <label htmlFor="userGroup">User Group</label>
              <select
                id="userGroup"
                defaultValue={row ? row.userGroupId : ""}
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
                defaultValue={row ? row.requester : ""}
                {...register("requester", { required: true })}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={classNames(styles.select_box)}>
              <label htmlFor="paperSize">Paper Size</label>
              <select
                id="paperSize"
                defaultValue={row ? row.size : "A2"}
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
                defaultValue={row ? row.quantity : ""}
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
              defaultValue={
                row
                  ? row.paperType
                  : 'Satin Photographic Paper 200gsm, 24" x 100 ft, 2" Core'
              }
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
          ) : row ? (
            <input
              className={classNames(styles.btn, styles.submit)}
              type="submit"
              value="Update record"
            />
          ) : (
            <input
              className={classNames(styles.btn, styles.submit)}
              type="submit"
              value="Add record"
            />
          )}
        </form>
      </div>
    </Modal>
  );
};

export default RecordModal;
