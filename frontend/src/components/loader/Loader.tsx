import classNames from "classnames";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={classNames(styles.main_container, styles.loader)}>
      <div className={classNames(styles.lds_roller)}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      Loading...
    </div>
  );
};

export default Loader;
