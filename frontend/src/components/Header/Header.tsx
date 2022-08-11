import classNames from "classnames";
import styles from "./Header.module.scss";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
const logo = require("../../assets/logo.png");

const Header = () => {
  const [timeValue, setTimeValue] = useState(
    moment(new Date()).format("Do, MMMM YYYY, h:mm:ss a")
  );
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(
      () => setTimeValue(moment(new Date()).format("Do, MMMM YYYY, h:mm:ss a")),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <header className={classNames(styles.container, styles.flex)}>
      <div className={classNames(styles.flex, styles.left_wrapper)}>
        <p style={{ opacity: "0.5" }}>
          <AccessTimeIcon />
          {timeValue}
        </p>
      </div>
      <div className={classNames(styles.flex, styles.right_wrapper)}>
        <img src={logo} width="220px" alt="foss logo" />
        <div className={classNames(styles.icon_box)}>
          <div onClick={logOutHandler}>
            <Tooltip title="Log out" arrow>
              <div className={classNames(styles.icon_wrapper)}>
                <LogoutIcon />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
