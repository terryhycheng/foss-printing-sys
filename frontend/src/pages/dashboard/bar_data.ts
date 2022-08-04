const labels = ["January", "February", "March", "April", "May", "June", "July"];

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
  labels,
  datasets: [
    {
      label: "No. of printed poster",
      data: labels.map(() => Math.round(Math.random() * 100)),
      backgroundColor: "rgba(3, 140, 183, 0.5)",
    },
  ],
};
