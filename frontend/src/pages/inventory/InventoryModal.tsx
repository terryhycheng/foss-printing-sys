import classNames from "classnames";
import styles from "./InventoryModal.module.scss";

import Modal from "@mui/material/Modal";

import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { InventoryDataType } from "./Inventory";
import { useState } from "react";
import axios from "axios";

type Props = {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  data: InventoryDataType[];
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const InventoryModal: React.FC<Props> = ({
  isModal,
  setIsModal,
  reload,
  setReload,
  data,
}) => {
  const handleClose = () => setIsModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const link = "http://localhost:5000/inventory";

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    for (let id of Object.keys(data)) {
      try {
        await axios.patch(`${link}/${id}`, {
          qty: parseInt(data[id]),
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
        <h2>Edit Inventory</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className={classNames(styles.subtitle)}>Consumables</h3>
          <hr />
          <ListItem type="maintenance" register={register} data={data} />
          <h3 className={classNames(styles.subtitle)}>Paper Roll (24")</h3>
          <hr />
          <ListItem type="paper_roll" register={register} data={data} />
          <h3 className={classNames(styles.subtitle)}>
            Ink Box (130ml) (2 MBK)
          </h3>
          <hr />
          <ListItem type="ink_box" register={register} data={data} />
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
  data: InventoryDataType[];
}) => {
  return (
    <>
      {props.data.map(
        (data) =>
          data.type === props.type && (
            <div key={data.code} className={classNames(styles.select_box)}>
              <h3>{data.name}</h3>
              <p>{data.code}</p>
              <input
                id="ugl"
                type="number"
                defaultValue={data.qty}
                {...props.register(`${data.id}`, { required: true })}
              />
            </div>
          )
      )}
    </>
  );
};

export default InventoryModal;
