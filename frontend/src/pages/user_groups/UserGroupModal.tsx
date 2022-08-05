import classNames from "classnames";
import styles from "./UserGroupModal.module.scss";

import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import moment from "moment";

type Props = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserGroupModal: React.FC<Props> = ({ isModal, setIsModal }) => {
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
        <h2>Add User Group</h2>
        <form className={classNames()} onSubmit={handleSubmit(onSubmit)}>
          <div className={classNames(styles.select_box)}>
            <label htmlFor="ugl">User Group Label</label>
            <input
              id="ugl"
              type="text"
              {...register("user-group-label", { required: true })}
            />
          </div>
          <div className={classNames(styles.select_box)}>
            <label htmlFor="ugl">User Group Full Name</label>
            <input
              id="ugl"
              type="text"
              {...register("user-group-full-name", { required: true })}
            />
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

export default UserGroupModal;
