import classNames from "classnames";
import Layout from "../../layouts/Layout";
import styles from "./Inventory.module.scss";

import LayersIcon from "@mui/icons-material/Layers";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import PrintIcon from "@mui/icons-material/Print";
import React, { useState } from "react";

type ItemType = {
  name: String;
  code: String;
  qty: Number;
};

const maintenanceData: ItemType[] = [
  {
    name: "Maintenance Cartridge MC-10",
    code: "1320B014BA",
    qty: 0,
  },
  {
    name: "Print head PF-04",
    code: "3630B001AA",
    qty: 3,
  },
];

const inkBoxData: ItemType[] = [
  {
    name: "MBK - Ink Tank PFI-8107MBK",
    code: "6709B001AA",
    qty: 0,
  },
  {
    name: "BK - Ink Tank PFI-8107BK",
    code: "6711B001AA",
    qty: 1,
  },
  {
    name: "C - Ink Tank PFI-8107C",
    code: "6712B001AA",
    qty: 1,
  },
  {
    name: "M - Ink Tank PFI-8107M",
    code: "6713B001AA",
    qty: 3,
  },
  {
    name: "Y - Ink Tank PFI-8107Y",
    code: "6714B001AA",
    qty: 2,
  },
];

const Item = (props: { item: ItemType }) => {
  return (
    <>
      {props.item.qty ? (
        <div
          key={props.item.code as React.Key}
          className={classNames(styles.row)}
        >
          <p className={styles.title}>{props.item.name}</p>
          <p>{props.item.code}</p>
          <p className={styles.number}>
            {`${props.item.qty}` ? `${props.item.qty}` : `-`}
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const Inventory = () => {
  return (
    <Layout>
      <div className={classNames(styles.main_container)}>
        <div>
          <h2>Inventory</h2>
        </div>
        <div className={classNames(styles.inventory_box)}>
          <div className={classNames(styles.box_wrapper)}>
            <div className={classNames(styles.icon_title)}>
              <PrintIcon />
              <h3>Print Head</h3>
            </div>
            <h2>4</h2>
          </div>
          <div className={classNames(styles.box_wrapper)}>
            <div className={classNames(styles.icon_title)}>
              <LayersIcon />
              <h3>Paper Rolls</h3>
            </div>
            <h2>3</h2>
          </div>
          <div className={classNames(styles.box_wrapper)}>
            <div className={classNames(styles.icon_title)}>
              <LocalDrinkIcon />
              <h3>Ink Boxes</h3>
            </div>
            <h2>6</h2>
          </div>
        </div>
        <div className={classNames(styles.box_wrapper)}>
          <div className={classNames(styles.icon_title, styles.table_title)}>
            <PrintIcon />
            <h3>Print Head</h3>
          </div>
          <hr />
          {maintenanceData.map((item) => (
            <div key={item.code as React.Key}>
              <Item item={item} />
            </div>
          ))}
        </div>
        <div className={classNames(styles.box_wrapper)}>
          <div className={classNames(styles.icon_title, styles.table_title)}>
            <LayersIcon />
            <h3>Paper Rolls</h3>
          </div>
          <hr />
          {maintenanceData.map((item) => (
            <div key={item.code as React.Key}>
              <Item item={item} />
            </div>
          ))}
        </div>
        <div className={classNames(styles.box_wrapper)}>
          <div className={classNames(styles.icon_title, styles.table_title)}>
            <LocalDrinkIcon />
            <h3>Ink Boxes</h3>
          </div>
          <hr />
          {inkBoxData.map((item) => (
            <div key={item.code as React.Key}>
              <Item item={item} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;
