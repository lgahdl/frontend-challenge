import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button } from "antd";
import style from "./style.module.scss";

const MapStateToProps = ({ settings, pokemons }) => ({ settings, pokemons });

const BottomBar = ({ settings, pokemons, dispatch, lastPage }) => {
  let interval: number =
    settings.screenWidth > 2000 || settings.screenWidth < 800 ? 10 : 6;

  let firstPageToSelect: number =
    settings.selectedSubpage - interval / 2 > 1
      ? settings.selectedSubpage - interval / 2 < lastPage - (interval - 1)
        ? settings.selectedSubpage - interval / 2
        : lastPage - (interval - 1)
      : 1;
  let pageButtons: Array<any> = [];
  for (
    let i: number = firstPageToSelect;
    i < firstPageToSelect + interval;
    i++
  ) {
    pageButtons.push(
      <Button
        onClick={async () => {
          dispatch({
            type: "settings/SET_STATE",
            payload: { selectedSubpage: i, search: false },
          });
          dispatch({ type: "pokemons/LOAD_PAGED_POKEMONS" });
        }}
        key={i}
        className={style.btn}
        style={{
          backgroundColor: settings.selectedSubpage == i ? "#ffcb05" : "white",
        }}
      >
        {i}
      </Button>
    );
  }
  return (
    <div className={style.body}>
      <div className={style.page_selector_body}>
        {settings.search ? null : (
          <div>
            <Button
              onClick={async () => {
                dispatch({
                  type: "settings/SET_STATE",
                  payload: { selectedSubpage: 1, search: false },
                });
                dispatch({ type: "pokemons/LOAD_PAGED_POKEMONS" });
              }}
              className={style.btn}
              style={{
                backgroundColor: "white",
              }}
            >
              {`<<`}
            </Button>
            {pageButtons}
            <Button
              onClick={async () => {
                dispatch({
                  type: "settings/SET_STATE",
                  payload: { selectedSubpage: lastPage, search: false },
                });
                dispatch({ type: "pokemons/LOAD_PAGED_POKEMONS" });
              }}
              className={style.btn}
              style={{
                backgroundColor: "white",
              }}
            >
              {`>>`}
            </Button>
          </div>
        )}
      </div>
      {settings.screenWidth < 1400 ? null : <div style={{ flex: 7 }} />}
    </div>
  );
};

export default connect(MapStateToProps)(BottomBar);
