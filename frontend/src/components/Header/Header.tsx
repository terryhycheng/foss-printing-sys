import classNames from "classnames";
import styles from "./Header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
const logo = require("../../assets/logo.png");

const Header = () => {
  const [timeValue, setTimeValue] = useState(
    moment(new Date()).format("Do, MMMM YYYY, h:mm:ss a")
  );

  useEffect(() => {
    const interval = setInterval(
      () => setTimeValue(moment(new Date()).format("Do, MMMM YYYY, h:mm:ss a")),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <header className={classNames(styles.container, styles.flex)}>
      <div className={classNames(styles.flex, styles.left_wrapper)}>
        <Tooltip title="Toggle menu" arrow>
          <div className={classNames(styles.icon_wrapper)}>
            <MenuIcon className="icon" />
          </div>
        </Tooltip>
        <p style={{ opacity: "0.5" }}>
          <AccessTimeIcon />
          {timeValue}
        </p>
      </div>
      <div className={classNames(styles.flex, styles.right_wrapper)}>
        <img src={logo} width="220px" alt="foss logo" />
        <p>
          Log in as <strong>Terry Cheng</strong>
        </p>
        <Tooltip title="Account setting" arrow>
          <div className={classNames(styles.icon_wrapper)}>
            <SettingsIcon />
          </div>
        </Tooltip>
        <Link to={"/auth"}>
          <Tooltip title="Log out" arrow>
            <div className={classNames(styles.icon_wrapper)}>
              <LogoutIcon />
            </div>
          </Tooltip>
        </Link>
      </div>
    </header>
  );
};

export default Header;
