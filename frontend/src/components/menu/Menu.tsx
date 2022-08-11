import classNames from "classnames";
import styles from "./Menu.module.scss";

import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import InboxIcon from "@mui/icons-material/Inbox";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MenuItem from "./MenuItem";

const Menu = () => {
  return (
    <nav className={classNames(styles.container)}>
      <h1>FOSS Printing System</h1>
      <ul>
        <MenuItem title="Dashboard" icon={<HomeIcon />} link="/" />
        {/* ------------------------------------------------------------ */}
        <h4 className={styles.title}>Print records</h4>
        <MenuItem
          title="Record List"
          icon={<FormatListBulletedIcon />}
          link="/print"
        />
        <MenuItem
          title="User Groups"
          icon={<PeopleOutlineIcon />}
          link="/usergroups"
        />
        {/* ------------------------------------------------------------ */}
        <h4 className={styles.title}>Inventory</h4>
        <MenuItem title="Inventory" icon={<InboxIcon />} link="/inventory" />
        {/* ------------------------------------------------------------ */}
        <h4 className={styles.title}>Important Info</h4>
        <MenuItem
          title="Printer Info"
          icon={<LocalPrintshopIcon />}
          link="/printer-info"
        />
        <MenuItem
          title="Contact Info"
          icon={<MailOutlineIcon />}
          link="/contact"
        />
      </ul>
    </nav>
  );
};

export default Menu;
