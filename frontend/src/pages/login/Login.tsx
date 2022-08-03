import styles from "./Login.module.scss";
import logo from "../../assets/logo.png";
import LoginForm from "../../components/login-form/LoginForm";
import { Route, Routes } from "react-router-dom";
import ResetPwForm from "../../components/reset-password-form/ResetPwForm";
import classNames from "classnames";

function Login() {
  return (
    <div className={classNames(styles.flex, styles.container)}>
      <div className={classNames(styles.flex, styles.box, styles.light_shadow)}>
        <div className={classNames(styles.left)}></div>
        <div className={classNames(styles.flex, styles.right)}>
          <div className={classNames(styles.flex, styles.logo_box)}>
            <img src={logo} alt="foss logo" width="300px" />
          </div>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/reset" element={<ResetPwForm />} />
          </Routes>
        </div>
      </div>
      <p className={classNames(styles.copyright)}>
        Copyright © 2022 Faculty of Social Sciences, The University of Hong
        Kong. All rights reserved.
      </p>
    </div>
  );
}

export default Login;
