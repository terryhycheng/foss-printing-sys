import ReactDOM from "react-dom/client";
import "./index.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import { store } from "./contexts/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import ErrorPage from "./pages/error/ErrorPage";
import RecordList from "./pages/record_list/RecordList";
import UserGroups from "./pages/user_groups/UserGroups";
import Inventory from "./pages/inventory/Inventory";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/auth/*" element={<Login />} />
        <Route path="/print" element={<RecordList />} />
        <Route path="/usergroups" element={<UserGroups />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
