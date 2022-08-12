import classNames from "classnames";
import styles from "./PrinterModal.module.scss";
import axios from "axios";

import Modal from "@mui/material/Modal";

import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { PrinterInfoType } from "./PrinterInfo";
import React, { useState } from "react";

type Props = {
  isModal: boolean;
  reload: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  data: PrinterInfoType[];
};

const PrinterModal: React.FC<Props> = ({
  isModal,
  setIsModal,
  data,
  reload,
  setReload,
}) => {
  const handleClose = () => setIsModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const link = `${process.env.REACT_APP_API}/api/printer`;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    for (let id of Object.keys(data)) {
      try {
        await axios.patch(`${link}/${id}`, {
          content: data[id],
        });
      } catch (error) {
        console.error(error);
      }
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
        <h2>Edit Printer Information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className={classNames(styles.subtitle)}>Basic Information</h3>
          <hr />
          <ListItem type="basic_info" register={register} data={data} />
          <h3 className={classNames(styles.subtitle)}>Useful Links</h3>
          <hr />
          <ListItem type="link" register={register} data={data} />
          {isLoading ? (
            <input
              className={classNames(styles.btn, styles.submit, styles.loading)}
              disabled
              type="submit"
              value="Loading..."
            />
          ) : (
            <input
              className={classNames(styles.btn, styles.submit)}
              type="submit"
              value="Update"
            />
          )}
        </form>
      </div>
    </Modal>
  );
};

const ListItem = (props: {
  type: string;
  register: UseFormRegister<FieldValues>;
  data: PrinterInfoType[];
}) => {
  return (
    <>
      {props.data.map(
        (item) =>
          item.type === props.type && (
            <div key={item.id} className={classNames(styles.select_box)}>
              <h3>{item.title}</h3>
              <input
                id="ugl"
                type="text"
                defaultValue={item.content}
                {...props.register(`${item.id}`, { required: true })}
              />
            </div>
          )
      )}
    </>
  );
};

export default PrinterModal;
