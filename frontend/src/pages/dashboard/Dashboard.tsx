import classNames from "classnames";
import Layout from "../../layouts/Layout";
import styles from "./Dashboard.module.scss";
// import { useSelector, useDispatch } from "react-redux";
// import { decrement, increment } from "../../contexts/slices/counterSlice";
// import { RootState } from "../../contexts/store";

function Dashboard() {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();

  return (
    <Layout>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.div)}>Dashboard</div>
        <div className={classNames(styles.div)}>Dashboard</div>
        <div className={classNames(styles.div)}>Dashboard</div>
        <div className={classNames(styles.div)}>Dashboard</div>
        <div className={classNames(styles.div)}>Dashboard</div>
        <div className={classNames(styles.div)}>Dashboard</div>
        <div className={classNames(styles.div)}>Dashboard</div>
      </div>
    </Layout>
  );
}

export default Dashboard;
