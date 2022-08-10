import styles from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm();
  // const navigate = useNavigate();
  const link = "http://localhost:5001/api/auth";

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await axios.post(link, data);
      console.log(res.data);
      // localStorage
      // navigate("/");
    } catch (error) {
      // error message -> true
      console.log(error);
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
          {...register("email", { required: true })}
        />
        <TextField
          className={classNames(styles.textfield)}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          {...register("password", { required: true })}
        />
        <button className={classNames(styles.btn)}>Login</button>
      </form>
      <Link className={classNames(styles.center)} to={"/auth/reset"}>
        Forgot password?
      </Link>
      <p className={classNames(styles.center)}>
        If you need an account, please contact IT team.
      </p>
    </div>
  );
};

export default LoginForm;
