import React from "react";
import { connect } from "react-redux";
import ListCard from "../../components/pokemons/ListCard";

const MapStateToProps = ({ pokemons }) => ({ pokemons: pokemons.pokemons });

const List = ({ pokemons }) => {
  return (
    <div style={{ flex: 1, color: "red", height: "100%" }}>
      All Pokémons
      {pokemons && pokemons.results
        ? pokemons.results.map((pokemon) => {
            return <ListCard pokemon={pokemon} />;
          })
        : null}
    </div>
  );
};

export default connect(MapStateToProps)(List);
