import classNames from "classnames";
import styles from "./RecordModal.module.scss";

import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import moment from "moment";

const paperSize = [
  {
    id: 1,
    value: "Satin Photographic Paper 200gsm",
  },
  {
    id: 2,
    value: "Satin Photographic Paper 240gsm",
  },
  {
    id: 3,
    value: "Glossy Photographic Paper 200gsm",
  },
  {
    id: 4,
    value: "Glossy Photographic Paper 240gsm",
  },
];

const paperType = ["A1", "A2", "A3"];

const userGroup = ["JCECC", "JC Wise", "JC Panda"];

type Props = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecordModal: React.FC<Props> = ({ isModal, setIsModal }) => {
  const handleClose = () => setIsModal(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
    handleClose();
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
              {...register("event", { required: true })}
            />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={classNames(styles.select_box)}>
              <label htmlFor="userGroup">User Group</label>
              <select
                id="userGroup"
                defaultValue=""
                className={classNames(styles.select_box)}
                {...register("userGroup", { required: true })}
              >
                <option disabled value="">
                  Please select
                </option>
                {userGroup.map((option) => (
                  <option key={option} value={option}>
                    {option}
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
                {...register("paperSize", { required: true })}
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
              <label htmlFor="qty">Quantity</label>
              <input
                id="qty"
                type="number"
                step="0.5"
                {...register("quantity", { required: true })}
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
              {paperSize.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
          <input
            className={classNames(styles.btn, styles.submit)}
            type="submit"
          />
        </form>
      </div>
    </Modal>
  );
};

export default RecordModal;
