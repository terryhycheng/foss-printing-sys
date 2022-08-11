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
import moment from "moment";

import LayersIcon from "@mui/icons-material/Layers";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import PrintIcon from "@mui/icons-material/Print";
import { useEffect, useState } from "react";
import axios from "axios";
import { Group } from "../user_groups/UserGroups";
import { recordType } from "../record_list/RecordList";
import Loader from "../../components/loader/Loader";
import { InventoryDataType } from "../inventory/Inventory";
import { authCheck } from "../../helpers/authCheck";
import { useNavigate } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [pieLabel, setPieLabel] = useState<Group[]>([]);
  const [pieData, setPieData] = useState<number[]>([]);
  const [barData, setBarData] = useState<Group[]>([]);
  const [qtyCount, setQtyCount] = useState([0, 0, 0]);
  const [printTotalCount, setPrintTotalCount] = useState(0);
  const [printMonthCount, setPrintMonthCount] = useState(0);
  const [printYearCount, setPrintYearCount] = useState(0);
  const labels: any[] = [];
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    authCheck(navigate);
    fetchData();
  }, []);

  let monthsRequired = 12;

  for (let i = 0; i <= monthsRequired; i++) {
    labels.unshift(moment().subtract(i, "months"));
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const fetchData = async () => {
    try {
      const userGroup_data = await axios.get(
        "http://terryhycheng.com:8088/api/usergroup"
      );
      const print_data = await axios.get(
        "http://terryhycheng.com:8088/api/print"
      );
      const inventory_data = await axios.get(
        "http://terryhycheng.com:8088/api/inventory"
      );
      projectData(print_data.data, userGroup_data.data);
      monthData(print_data.data);
      calQty(inventory_data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const projectData = (printData: recordType[], userGroupData: Group[]) => {
    const projectTotal: any[] = [];
    const pie_label: any[] = [];
    const pie_data: any[] = [];

    userGroupData.forEach((item) => {
      projectTotal.push({
        userGroupId: item.id,
        userGroup: item.slug,
        quantity: 0,
      });
    });
    printData.forEach((item) => {
      projectTotal.forEach((project) => {
        if (item.userGroupId === project.userGroupId) {
          if (item.size === "A1") {
            project.quantity += item.quantity * 2;
          } else if (item.size === "A3") {
            project.quantity += item.quantity / 2;
          } else {
            project.quantity += item.quantity;
          }
        }
      });
    });
    projectTotal.forEach((item) => {
      pie_label.push(item.userGroup);
      pie_data.push(item.quantity);
      setPieData(pie_data);
      setPieLabel(pie_label);
    });
  };

  const monthData = (data: recordType[]) => {
    let total_curMonth_print = 0;
    let total_year_print = 0;
    let total_total_print = 0;
    const bar_data: any[] = [];

    const monthTotal: any[] = labels.map((item) => ({
      time: moment(item).format("MM YYYY"),
      quantity: 0,
    }));

    // console.log(data);

    data.forEach((item) => {
      monthTotal.forEach((month) => {
        if (moment(item.date).format("MM YYYY") === month.time) {
          if (item.size === "A1") {
            month.quantity += item.quantity * 2;
            total_year_print += item.quantity * 2;
          } else if (item.size === "A3") {
            month.quantity += item.quantity / 2;
            total_year_print += item.quantity / 2;
          } else {
            month.quantity += item.quantity;
            total_year_print += item.quantity;
          }
        }
      });
      if (moment(item.date).format("MM YYYY") === moment().format("MM YYYY")) {
        if (item.size === "A1") {
          total_curMonth_print += item.quantity * 2;
        } else if (item.size === "A3") {
          total_curMonth_print += item.quantity / 2;
        } else {
          total_curMonth_print += item.quantity;
        }
      }
      total_total_print += item.quantity;
    });
    monthTotal.map((item) => bar_data.push(item.quantity));
    setBarData(bar_data);
    setPrintMonthCount(total_curMonth_print);
    setPrintYearCount(total_year_print);
    setPrintTotalCount(total_total_print);
  };

  const calQty = (data: InventoryDataType[]) => {
    const count: number[] = [0, 0, 0];
    for (let item of data) {
      switch (item.type) {
        case "maintenance":
          count[0] += item.quantity;
          break;
        case "paper_roll":
          count[1] += item.quantity;
          break;
        case "ink_box":
          count[2] += item.quantity;
          break;
        default:
          break;
      }
    }
    setQtyCount(count);
  };

  return (
    <Layout>
      {!isLoading && (
        <div className={classNames(styles.main_container)}>
          <h2>Total A2 Prints by Date</h2>
          <div className={classNames(styles.div, styles.top_wrapper)}>
            <div>
              <h3>Total Prints (current month)</h3>
              <strong>{printMonthCount}</strong>
            </div>
            <div>
              <h3>Total Prints (in 12 months):</h3>
              <strong>{printYearCount}</strong>
            </div>
            <div>
              <h3>Average Prints (monthly)</h3>
              <strong>{(printYearCount / monthsRequired).toFixed(2)}</strong>
            </div>
          </div>
          <div className={classNames(styles.div)}>
            <Bar
              options={options}
              data={{
                labels: labels.map((item) => moment(item).format("MMM YYYY")),
                datasets: [
                  {
                    label: "No. of printed poster",
                    data: barData,
                    backgroundColor: "rgba(3, 140, 183, 0.5)",
                  },
                ],
              }}
              width={"100%"}
              height={"350px"}
            />
          </div>
          <div className={classNames(styles.div_wrapper, styles.btm_container)}>
            <div className={classNames(styles.btm_wrapper)}>
              <h2>% Usage by User Groups</h2>
              <div className={classNames(styles.div)}>
                <Pie
                  data={{
                    labels: pieLabel,
                    datasets: [
                      {
                        label: "# of Prints",
                        data: pieData.map((item) =>
                          (item / printTotalCount).toFixed(2)
                        ),
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                          "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
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
                    <PrintIcon />
                    <h3>Print Head</h3>
                  </div>
                  <h2>{qtyCount[0]}</h2>
                </div>
                <div>
                  <div className={classNames(styles.icon_title)}>
                    <LayersIcon />
                    <h3>Paper Rolls</h3>
                  </div>
                  <h2>{qtyCount[1]}</h2>
                </div>
                <div>
                  <div className={classNames(styles.icon_title)}>
                    <LocalDrinkIcon />
                    <h3>Ink Boxes</h3>
                  </div>
                  <h2>{qtyCount[2]}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
    </Layout>
  );
}

export default Dashboard;
