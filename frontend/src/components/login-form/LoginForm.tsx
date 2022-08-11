import styles from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";
import { useState } from "react";

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isWarning, setIsWarning] = useState(false);
  const navigate = useNavigate();
  const link = "http://localhost:5001/api/auth";

  const onChangeHandler = () => setIsWarning(false);

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await axios.post(link, data);
      console.log(res.data);
      // localStorage
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
      <div className={classNames(styles.center)}>
        <Link to={"/auth/reset"}>Forgot password?</Link>
      </div>
      <p className={classNames(styles.center)}>
        If you need an account, please contact IT team.
      </p>
    </div>
  );
};

export default LoginForm;
