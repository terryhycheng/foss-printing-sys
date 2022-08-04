import classNames from "classnames";
import styles from "./Menu.module.scss";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import InboxIcon from "@mui/icons-material/Inbox";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const Menu = () => {
  return (
    <nav className={classNames(styles.container)}>
      <h1>FOSS Printing System</h1>
      {/* ------------------------------------------------------------ */}
      <ul>
        <Link to={"/"}>
          <li>
            <HomeIcon />
            Dashboard
          </li>
        </Link>
        {/* ------------------------------------------------------------ */}
        <h4 className={styles.title}>Print records</h4>
        <Link to={"/print"}>
          <li>
            <FormatListBulletedIcon />
            Record List
          </li>
        </Link>
        <Link to={"/usergroups"}>
          <li>
            <PeopleOutlineIcon />
            User Groups
          </li>
        </Link>
        {/* ------------------------------------------------------------ */}
        <h4 className={styles.title}>Consumables</h4>
        <Link to={"/"}>
          <li>
            <InboxIcon />
            Inventory
          </li>
        </Link>
        {/* ------------------------------------------------------------ */}
        <h4 className={styles.title}>Print records</h4>
        <Link to={"/"}>
          <li>
            <LocalPrintshopIcon />
            Printer Info
          </li>
        </Link>
        <Link to={"/"}>
          <li>
            <MailOutlineIcon />
            Contact Info
          </li>
        </Link>
        {/* ------------------------------------------------------------ */}
        <h4 className={styles.title}>Print records</h4>
        <Link to={"/"}>
          <li>
            <PersonOutlineIcon />
            System Users
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Menu;
