import React from "react";
import { connect } from "react-redux";
import style from "./style.module.scss";

const MapStateToProps = ({ settings }) => ({ settings });

const TopBar = ({ settings, dispatch }) => {
  return (
    <div className={style.body}>
      <div className={style.img_body}>
        <img
          src="resources/pokemon-logo.png"
          className="App-logo"
          alt="logo"
          style={{ width: 400, height: 180 }}
        />
      </div>
      <div className={style.page_selector}>
        <div
          onClick={async () => {
            dispatch({
              type: "settings/SET_STATE",
              payload: { page: "pokemon", search: false },
            });
            window.location.href = "#/pokemons";
          }}
          className={style.page_selector_btn}
          style={{
            backgroundColor: settings.page == "pokemon" ? "#3367B0" : "#003D80",
          }}
        >
          <b>Pokémons</b>
        </div>
      </div>
    </div>
  );
};

export default connect(MapStateToProps)(TopBar);
