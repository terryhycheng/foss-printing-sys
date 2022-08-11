import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import styles from "./ResetPwForm.module.scss";
import classNames from "classnames";
import React, { useState } from "react";
import axios from "axios";

const ResetPwForm = ({
  setIsForget,
}: {
  setIsForget: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [isSuccessful, setIsSuccessful] = useState(false);

  const onSubmit = async (data: any) => {
    console.log(data);
    await axios.post(
      "https://desolate-retreat-50772.herokuapp.com/api/reset",
      data
    );
    reset();
    setIsSuccessful(true);
  };
  return (
    <div className={classNames(styles.flex, styles.container)}>
      <div className={classNames(styles.flex, styles.container)}>
        <h2>Reset Password</h2>
        <p>Please enter your login email to reset your password.</p>
      </div>
      <form
        className={classNames(styles.flex)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          className={classNames(styles.textfield)}
          id="reset-email"
          label="Email"
          variant="outlined"
          type="email"
          {...register("email", { required: true })}
        />
        {isSuccessful && (
          <div className={classNames(styles.message_box)}>
            A reset email has been successfully sent to your email. Please
            check.
          </div>
        )}
        <button className={classNames(styles.btn)}>
          Request a reset email
        </button>
        <div
          className={classNames(styles.center, styles.btn_outline)}
          onClick={() => setIsForget(false)}
        >
          Back
        </div>
      </form>
    </div>
  );
};

export default ResetPwForm;
