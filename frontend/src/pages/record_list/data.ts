import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";

export const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    type: "date",
    width: 180,
  },
  { field: "eventName", headerName: "Event Name", width: 300 },
  { field: "userGroup", headerName: "User Group", width: 150 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
  { field: "size", headerName: "Size", width: 80 },
  { field: "requester", headerName: "Requester", width: 150 },
];

export const rows = [
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
    eventName: "Lannister",
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
