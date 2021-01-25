import React from "react";
import { Card } from "antd";
import { connect } from "react-redux";

const MapStateToProps = ({ settings, pokemons }) => ({
  settings,
  pokemons,
});

const emptyPokemon = {
  name: "",
  id: 0,
  moves: [],
  types: [],
  sprites: { front_default: "" },
};

const DetailsCard = ({ settings, pokemons }) => {
  let selectedPokemon = pokemons.selectedPokemon
    ? pokemons.selectedPokemon
    : emptyPokemon;
  let name = selectedPokemon.name;
  name = name
    .split("-")
    .map((subName) => {
      return subName.charAt(0).toUpperCase() + subName.slice(1);
    })
    .join(" ");
  console.log(settings.screenWidth);
  let pokemonNumber = pokemons.selectedPokemonId;
  return (
    <Card
      title={"Pokémon No. " + pokemonNumber}
      style={{ width: "100%", padding: 20 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: settings.screenWidth > 1100 ? "row" : "column",
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            src={selectedPokemon.sprites.front_default}
            className="img-fluid"
            style={{ width: 300, minWidth: 150 }}
          />
        </div>
        <div style={{ flex: 3, paddingTop: 20, paddingLeft: 20 }}>
          <ul className="list-group">
            <div style={{ paddingBottom: 10 }}>
              <b>Name</b>
            </div>
            <li className="list-group-item">
              {name} <br />
            </li>
            <div style={{ paddingBottom: 10, paddingTop: 10 }}>
              <b>Number </b>
            </div>
            <li className="list-group-item">
              {pokemonNumber} <br />
            </li>
            <div style={{ paddingBottom: 10, paddingTop: 10 }}>
              <b>Types</b>
            </div>
            {selectedPokemon.types.map((item) => {
              return <li className="list-group-item">{item.type.name}</li>;
            })}
          </ul>
          <div style={{ paddingBottom: 10, paddingTop: 10 }}>
            <b>Moves({selectedPokemon.moves.length})</b>
          </div>
          <div
            style={{
              borderTopStyle: "solid",
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.125)",
            }}
          >
            <ul
              className="list-inline"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
              }}
            >
              {selectedPokemon.moves.map((item, index) => {
                return (
                  <li key={index} className="list-group-item">
                    <b>{index + 1}</b>: {item.move.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default connect(MapStateToProps)(DetailsCard);
