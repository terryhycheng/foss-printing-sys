import jwt from "jsonwebtoken";
import { NavigateFunction } from "react-router-dom";

export const authCheck = (navigate: NavigateFunction) => {
  const token = localStorage.getItem("token");
  const serect = process.env.REACT_APP_JWT_SECRET!;

  if (token) {
    const check = jwt.verify(token, serect);
    !check && navigate("/auth");
  } else {
    navigate("/auth");
  }
};

export const isLogInCheck = (navigate: NavigateFunction) => {
  const token = localStorage.getItem("token");
  const serect = process.env.REACT_APP_JWT_SECRET!;

  if (token) {
    const check = jwt.verify(token, serect);
    check && navigate("/");
  } else {
    navigate("/auth");
  }
};
