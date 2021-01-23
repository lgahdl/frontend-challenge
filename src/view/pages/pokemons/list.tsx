import React from "react";
import { connect } from "react-redux";
import ListCard from "../../components/pokemons/ListCard";
import TopBar from "../../components/main/TopBar";
import BottomBar from "../../components/main/BottomBar";
import Scrollbar from "react-scrollbar";

const MapStateToProps = ({ pokemons, settings }) => ({
  pokemons: pokemons.pokemons,
  settings,
});

const List = ({ pokemons, settings, dispatch }) => {
  if (settings.page != "pokemon") {
    dispatch({ type: "settings/SET_STATE", payload: { page: "pokemon" } });
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        color: "red",
        height: window.innerHeight,
      }}
    >
      <TopBar />
      <div style={{ display: "flex", paddingTop: 20, paddingBottom: 20 }}>
        <Scrollbar
          speed={1}
          smoothScrolling
          className="area"
          contentClassName="content"
          horizontal={false}
          style={{ paddingLeft: 20 }}
        >
          {pokemons && pokemons.results
            ? pokemons.results.map((pokemon, index) => {
                return <ListCard pokemon={pokemon} key={index} index={index} />;
              })
            : null}
        </Scrollbar>
      </div>
      <BottomBar lastPage={Math.ceil(pokemons.count / 30)} />
    </div>
  );
};

export default connect(MapStateToProps)(List);
