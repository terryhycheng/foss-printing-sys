import moment from "moment";
import { recordType } from "../record_list/RecordList";
import { Group } from "../user_groups/UserGroups";

const pie_label: any[] = [];
const pie_data: any[] = [];
const labels: any[] = [];
const bar_data: any[] = [];

export const projectData = (userGroup: Group[], data: recordType[]) => {
  const projectTotal: any[] = [];
  userGroup.map((item) => {
    projectTotal.push({ userGroup: item.slug, quantity: 0 });
  });
  data.map((item) => {
    projectTotal.forEach((project) => {
      if (item.userGroup === project.userGroup)
        project.quantity += item.quantity;
    });
  });
  projectTotal.map((item) => {
    pie_label.push(item.userGroup);
    pie_data.push(item.quantity);
  });
  // console.log(projectTotal);
  // console.log(pie_data, pie_label);
};

let monthsRequired = 12;

for (let i = 1; i <= monthsRequired; i++) {
  labels.unshift(moment().subtract(i, "months"));
}
export const monthData = (data: recordType[]) => {
  const monthTotal: any[] = labels.map((item) => ({
    time: moment(item).format("MM YYYY"),
    quantity: 0,
  }));
  data.map((item) => {
    monthTotal.forEach((month) => {
      if (moment(item.date).format("MM YYYY") === month.time) {
        month.quantity += item.quantity;
      }
    });
  });
  monthTotal.map((item) => bar_data.push(item.quantity));
  // console.log(monthTotal);
  console.log(bar_data);
};

// Bar Data

export const options = {
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

export const b_data = {
  labels: labels.map((item) => moment(item).format("MMM YYYY")),
  datasets: [
    {
      label: "No. of printed poster",
      data: bar_data,
      backgroundColor: "rgba(3, 140, 183, 0.5)",
    },
  ],
};

// Pie Data

export const p_data = {
  labels: pie_label,
  datasets: [
    {
      label: "# of Votes",
      data: pie_data,
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
};
