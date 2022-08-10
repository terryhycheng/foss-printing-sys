import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Layout from "../../layouts/Layout";
import styles from "./Inventory.module.scss";

import EditIcon from "@mui/icons-material/Edit";
import LayersIcon from "@mui/icons-material/Layers";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import PrintIcon from "@mui/icons-material/Print";

import InventoryModal from "./InventoryModal";
import axios from "axios";
import Loader from "../../components/loader/Loader";

export type InventoryDataType = {
  id: number;
  type: string;
  name: string;
  code: string;
  quantity: number;
};

// Main FC
const Inventory = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const [qtyCount, setQtyCount] = useState([0, 0, 0]);
  const [data, setData] = useState<InventoryDataType[]>([]);
  const handleOpen = () => setIsModal(true);
  const link = "http://localhost:5001/api/inventory";

  // Calculate quantity function
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

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(link);
      setData(res.data);
      calQty(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      {!isLoading && (
        <div className={classNames(styles.main_container)}>
          <div className={classNames(styles.title_box)}>
            <h2>Inventory</h2>
            <button className={classNames(styles.btn)} onClick={handleOpen}>
              <EditIcon />
              Edit
            </button>
          </div>
          {/* ---------- Overview Box ---------- */}
          <div className={classNames(styles.inventory_box)}>
            <div className={classNames(styles.box_wrapper)}>
              <div className={classNames(styles.icon_title)}>
                <PrintIcon />
                <h3>Print Head</h3>
              </div>
              <h2>{qtyCount[0]}</h2>
            </div>
            <div className={classNames(styles.box_wrapper)}>
              <div className={classNames(styles.icon_title)}>
                <LayersIcon />
                <h3>Paper Rolls</h3>
              </div>
              <h2>{qtyCount[1]}</h2>
            </div>
            <div className={classNames(styles.box_wrapper)}>
              <div className={classNames(styles.icon_title)}>
                <LocalDrinkIcon />
                <h3>Ink Boxes</h3>
              </div>
              <h2>{qtyCount[2]}</h2>
            </div>
          </div>
          {/* ---------- Detail List ---------- */}
          <div className={classNames(styles.box_wrapper)}>
            <div className={classNames(styles.icon_title, styles.table_title)}>
              <PrintIcon />
              <h3>Print Head</h3>
            </div>
            <RowTitle />
            <hr />
            <Item type={"maintenance"} data={data} />
          </div>
          <div className={classNames(styles.box_wrapper)}>
            <div className={classNames(styles.icon_title, styles.table_title)}>
              <LayersIcon />
              <h3>Paper Rolls</h3>
            </div>
            <RowTitle />
            <hr />
            <Item type={"paper_roll"} data={data} />
          </div>
          <div className={classNames(styles.box_wrapper)}>
            <div className={classNames(styles.icon_title, styles.table_title)}>
              <LocalDrinkIcon />
              <h3>Ink Boxes</h3>
            </div>
            <RowTitle />
            <hr />
            <Item type={"ink_box"} data={data} />
          </div>
        </div>
      )}
      <InventoryModal
        isModal={isModal}
        setIsModal={setIsModal}
        data={data}
        reload={reload}
        setReload={setReload}
      />
      {isLoading && <Loader />}
    </Layout>
  );
};

// Row Title FC
const RowTitle = () => {
  return (
    <div className={classNames(styles.row_title)}>
      <p>Product Name</p>
      <p>Code</p>
      <p style={{ textAlign: "center" }}>Quantity</p>
    </div>
  );
};

// Item FC : Interate and display the item while type mataches && Qty > 0
const Item = (props: { type: String; data: InventoryDataType[] }) => {
  return (
    <>
      {props.data.map(
        (item) =>
          // Type checking
          item.type === props.type && (
            <div key={item.code as React.Key}>
              {/* Qty Checking */}
              {item.quantity ? (
                <div
                  key={item.code as React.Key}
                  className={classNames(styles.row)}
                >
                  <p className={styles.title}>{item.name}</p>
                  <p>{item.code}</p>
                  <p className={styles.number}>
                    {`${item.quantity}` ? `${item.quantity}` : `-`}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          )
      )}
    </>
  );
};

export default Inventory;
