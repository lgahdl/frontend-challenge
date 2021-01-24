import React, { useRef } from "react";
import { connect } from "react-redux";
import ListCard from "../../components/pokemons/ListCard";
import DetailsCard from "../../components/pokemons/DetailsCard";
import TopBar from "../../components/main/TopBar";
import BottomBar from "../../components/main/BottomBar";
import Scrollbar from "react-scrollbar";

const MapStateToProps = ({ pokemons, settings }) => ({
  pokemons: pokemons,
  settings,
});

const List = ({ pokemons, settings, dispatch }) => {
  if (settings.page != "pokemon") {
    dispatch({ type: "settings/SET_STATE", payload: { page: "pokemon" } });
  }
  const allPokemons = pokemons.allPokemons ? pokemons.allPokemons : null;
  const selectedPokemon = pokemons.selectedPokemon
    ? pokemons.selectedPokemon
    : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <TopBar />
      <div
        style={{
          display: "flex",
          flexDirection: settings.screenWidth > 700 ? "row" : "column-reverse",
          flex: 1,
          width: "100%",
        }}
      >
        <Scrollbar
          speed={1}
          smoothScrolling
          className="area1"
          contentClassName="content"
          horizontal={false}
          style={{
            paddingLeft: 20,
            height: 0.7 * window.innerHeight,
          }}
          contentStyle={{
            padding: 20,
          }}
        >
          {allPokemons && allPokemons.results
            ? allPokemons.results.map((pokemon, index) => {
                return <ListCard pokemon={pokemon} key={index} index={index} />;
              })
            : null}
        </Scrollbar>
        <Scrollbar
          speed={1}
          smoothScrolling
          className="area2"
          contentClassName="content"
          horizontal={false}
          style={{
            flex: 1,
            height: 0.7 * window.innerHeight,
          }}
          contentStyle={{
            padding: 20,
          }}
        >
          {selectedPokemon ? <DetailsCard /> : null}
        </Scrollbar>
      </div>
      <BottomBar lastPage={Math.ceil(allPokemons.count / 30)} />
    </div>
  );
};

export default connect(MapStateToProps)(List);
