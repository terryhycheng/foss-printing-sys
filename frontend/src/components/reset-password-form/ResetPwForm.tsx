import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./ResetPwForm.module.scss";
import classNames from "classnames";

const ResetPwForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };
  return (
    <div className={classNames(styles.flex, styles.container)}>
      <div className={classNames(styles.flex, styles.container)}>
        <h2>Reset Password</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          repellat repellendus eveniet nam fuga, minus in, explicabo temporibus
          mollitia ipsa accusamus numquam officia.
        </p>
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
          {...register("reset-email", { required: true })}
        />
        <button className={classNames(styles.btn)}>
          Request a reset email
        </button>
        <Link
          to={"/auth"}
          className={classNames(styles.center, styles.btn_outline)}
        >
          Back
        </Link>
      </form>
    </div>
  );
};

export default ResetPwForm;
