import { TextField } from "@mui/material";
import axios from "axios";
import classNames from "classnames";
import styles from "./Reset.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";

type resDataType = {
  id: string;
  userId: string;
  email: string;
};

const Reset = () => {
  const { id } = useParams();
  const [resetData, setResetData] = useState<resDataType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const link = `${process.env.REACT_APP_API}/api/reset`;

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${link}/${id}`);
    if (res.data) {
      setResetData(res.data);
      setIsLoading(false);
    } else {
      navigate("/error");
    }
  };

  const onSubmit = async (data: any) => {
    console.log(data.password === data.rePassword);
    if (data.password === data.rePassword) {
      console.log(data);
      try {
        await axios.patch(`${link}/${id}`, { password: data.password });
        await axios.delete(`${link}/${id}`);
        navigate("/auth");
      } catch (error) {
        console.error(error);
      }
      reset();
    } else {
      setIsWarning(true);
    }
  };

  return (
    <>
      {!isLoading && (
        <div className={classNames(styles.flex, styles.container, styles.card)}>
          <h2>Reset Password for {resetData?.email}</h2>
          <form
            className={classNames(styles.flex)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              className={classNames(styles.textfield)}
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              onFocus={() => setIsWarning(false)}
              {...register("password", { required: true })}
            />
            <TextField
              className={classNames(styles.textfield)}
              id="re-password"
              label="Reconfirm Password"
              variant="outlined"
              type="password"
              onFocus={() => setIsWarning(false)}
              {...register("rePassword", { required: true })}
            />
            {isWarning && (
              <div className={classNames(styles.warning_box)}>
                Re-password doesn&apos;t match with password.
              </div>
            )}
            <button className={classNames(styles.btn)}>Reset Password</button>
          </form>
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default Reset;
