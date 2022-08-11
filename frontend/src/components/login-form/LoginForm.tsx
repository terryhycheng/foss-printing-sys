import styles from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";
import React, { useState } from "react";

const LoginForm = ({
  setIsForget,
}: {
  setIsForget: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [isWarning, setIsWarning] = useState(false);
  const navigate = useNavigate();
  const link = "https://desolate-retreat-50772.herokuapp.com/api/auth";

  const onChangeHandler = () => setIsWarning(false);

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(link, data);
      console.log(res.data);
      localStorage.setItem("token", res.data);
      navigate("/");
    } catch (error) {
      setIsWarning(true);
    }
    reset();
  };
  return (
    <div className={classNames(styles.loginForm)}>
      <div>
        <h2>FOSS Printing System</h2>
        <h3>Log in portal</h3>
      </div>
      <form
        className={classNames(styles.flex)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          className={classNames(styles.textfield)}
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          onFocus={onChangeHandler}
          {...register("email", { required: true })}
        />
        <TextField
          className={classNames(styles.textfield)}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          onFocus={onChangeHandler}
          {...register("password", { required: true })}
        />
        {isWarning && (
          <div className={classNames(styles.warning_box)}>
            Invalid login credentials. Please try again.
          </div>
        )}
        <button className={classNames(styles.btn)}>Login</button>
      </form>
      <div
        className={classNames(styles.center)}
        onClick={() => setIsForget(true)}
      >
        <span>Forgot password?</span>
      </div>
      <p className={classNames(styles.center)}>
        If you need an account, please contact IT team.
      </p>
    </div>
  );
};

export default LoginForm;
