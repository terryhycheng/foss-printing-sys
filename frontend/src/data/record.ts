import moment from "moment";

export const records = [
  {
    id: 1,
    date: moment().format("YYYY-MM-DD"),
    eventName: "Snow",
    userGroup: "JCECC",
    quantity: 35,
    size: "A2",
    requester: "Mary Tsang",
  },
  {
    id: 2,
    date: moment("2022-12-24").format("YYYY-MM-DD"),
    eventName:
      "Lannister Lannister Lannister Lannister Lannister Lannister Lannister",
    userGroup: "JC WISE",
    quantity: 42,
    size: "A2",
    requester: "Alan Tang",
  },
  {
    id: 3,
    date: moment("2021-5-22").format("YYYY-MM-DD"),
    eventName: "Lannister",
    userGroup: "Faculty",
    quantity: 45,
    size: "A2",
    requester: "Mary Tsang",
  },
];
