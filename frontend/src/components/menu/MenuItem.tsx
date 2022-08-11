import { Link } from "react-router-dom";

type MenuItemType = {
  title: string;
  link: string;
  icon: any;
};

const MenuItem = (item: MenuItemType) => {
  return (
    <Link to={item.link}>
      <li>
        {item.icon}
        {item.title}
      </li>
    </Link>
  );
};

export default MenuItem;
