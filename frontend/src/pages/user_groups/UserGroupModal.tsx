import classNames from "classnames";
import styles from "./UserGroupModal.module.scss";

import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import { Group } from "./UserGroups";
import axios from "axios";

type Props = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  row?: Group;
};

const UserGroupModal: React.FC<Props> = ({
  isModal,
  setIsModal,
  reload,
  setReload,
  row,
}) => {
  const handleClose = () => setIsModal(false);
  const { register, handleSubmit, reset } = useForm();

  const link = "http://localhost:5000/user_group";

  const onSubmit = async (data: any) => {
    row
      ? await axios.patch(`${link}/${row.id}`, data)
      : await axios.post(`${link}`, {
          id: Math.round(Math.random() * 1000),
          FullName: data.FullName,
          slug: data.slug,
        });
    setReload(!reload);
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
              defaultValue={row ? row.slug : ""}
              id="ugl"
              type="text"
              {...register("slug", { required: true })}
            />
          </div>
          <div className={classNames(styles.select_box)}>
            <label htmlFor="ugl">User Group Full Name</label>
            <input
              defaultValue={row ? row.FullName : ""}
              id="ugl"
              type="text"
              {...register("FullName", { required: true })}
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
