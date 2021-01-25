import React, { useRef } from "react";
import { connect } from "react-redux";
import TopBar from "../../../components/main/TopBar";
import style from "./style.module.scss";

const MapStateToProps = ({ settings }) => ({ settings });

const Error404 = ({ settings, dispatch }) => {
  if (settings.page != "error") {
    dispatch({ type: "settings/SET_STATE", payload: { page: "error" } });
  }

  return (
    <div className={style.body}>
      <TopBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          height: 0.8 * settings.screenHeight,
          fontSize: 42,
        }}
      >
        <b>Error 404 - Page Not Found</b>
      </div>
    </div>
  );
};

export default connect(MapStateToProps)(Error404);
