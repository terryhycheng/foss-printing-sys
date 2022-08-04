import classNames from "classnames";
import Layout from "../../layouts/Layout";
import styles from "./Dashboard.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { b_data, options } from "./bar_data";
import { p_data } from "./pie_data";

import LayersIcon from "@mui/icons-material/Layers";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import PrintIcon from "@mui/icons-material/Print";

// import { useSelector, useDispatch } from "react-redux";
// import { decrement, increment } from "../../contexts/slices/counterSlice";
// import { RootState } from "../../contexts/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();

  return (
    <Layout>
      <div className={classNames(styles.main_container)}>
        <h2>Dashboard</h2>
        <div className={classNames(styles.div, styles.top_wrapper)}>
          <div>
            <h3>Total Prints (current month)</h3>
            <strong>64</strong>
          </div>
          <div>
            <h3>Average Prints (monthly)</h3>
            <strong>30</strong>
          </div>
          <div>
            <h3>Print Head Used (days):</h3>
            <strong>145</strong>
          </div>
        </div>
        <div className={classNames(styles.div)}>
          <Bar
            options={options}
            data={b_data}
            width={"100%"}
            height={"350px"}
          />
        </div>
        <div className={classNames(styles.div_wrapper, styles.btm_container)}>
          <div className={classNames(styles.btm_wrapper)}>
            <h2>Total usage by user groups</h2>
            <div className={classNames(styles.div)}>
              <Pie
                data={p_data}
                height={300}
                width={"100%"}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
          <div className={classNames(styles.btm_wrapper)}>
            <h2>Inventory Overview</h2>
            <div className={classNames(styles.div, styles.inventory_box)}>
              <div>
                <div className={classNames(styles.icon_title)}>
                  <LayersIcon />
                  <h3>Paper Rolls</h3>
                </div>
                <h2>3</h2>
              </div>
              <div>
                <div className={classNames(styles.icon_title)}>
                  <LocalDrinkIcon />
                  <h3>Ink Boxes</h3>
                </div>
                <h2>6</h2>
              </div>
              <div>
                <div className={classNames(styles.icon_title)}>
                  <PrintIcon />
                  <h3>Print Head</h3>
                </div>
                <h2>1</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
