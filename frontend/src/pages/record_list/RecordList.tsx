import { useState } from "react";
import classNames from "classnames";
import Layout from "../../layouts/Layout";
import styles from "./RecordList.module.scss";

import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";

import { columns, rows } from "./data";
import { useForm } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const RecordList = () => {
  const [isModal, setIsModal] = useState(false);
  const handleOpen = () => setIsModal(true);
  const handleClose = () => setIsModal(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <Layout>
      <div className={classNames(styles.main_container)}>
        <div className={classNames(styles.title_container)}>
          <h2>Print Record List</h2>
          <button onClick={handleOpen} className={classNames(styles.btn)}>
            <AddIcon />
            Add Print Record
          </button>
        </div>
        <div style={{ height: "60vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            checkboxSelection
            initialState={{
              sorting: {
                sortModel: [{ field: "date", sort: "desc" }],
              },
            }}
          />
        </div>
        {/* ---- Modal ---- */}
        <Modal
          open={isModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={classNames(styles.modal_container)}>
            <h2>Add Print Record</h2>
            <form className={classNames()} onSubmit={handleSubmit(onSubmit)}>
              <FormControl className={classNames(styles.select_box)}>
                <InputLabel id="paper-size-label">Paper</InputLabel>
                <Select
                  labelId="paper-size-label"
                  label="Paper"
                  {...register("paperSize", { required: true })}
                >
                  <MenuItem value="A1">A1</MenuItem>
                  <MenuItem value="A2">A2</MenuItem>
                </Select>
              </FormControl>
              <input className={classNames(styles.btn)} type="submit" />
            </form>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default RecordList;
