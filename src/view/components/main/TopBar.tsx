import { useState } from "react";
import { connect } from "react-redux";
import { Button } from "antd";

const MapStateToProps = ({ settings }) => ({ settings });

const TopBar = ({ settings, dispatch }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 250,
        backgroundColor: "#6F88D9",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: "100%",
          alignItems: "center",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <img
          src="resources/pokemon-logo.png"
          className="App-logo"
          alt="logo"
          style={{ width: 400, height: 180 }}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#003D80",
          display: "flex",
        }}
      >
        <div
          onClick={async () => {
            dispatch({
              type: "settings/SET_STATE",
              payload: { page: "pokemon", search: false },
            });
          }}
          style={{
            cursor: "pointer",
            marginLeft: 20,
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            backgroundColor: settings.page == "pokemon" ? "#3367B0" : "#003D80",
            color: "white",
          }}
        >
          <b>Pokémons</b>
        </div>
      </div>
    </div>
  );
};

export default connect(MapStateToProps)(TopBar);
