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
        <div style={{ flex: 3 }}>
          <ul>
            <li>
              <b>Name:</b> {name} <br />
            </li>
            <li>
              <b>Number: </b> {pokemonNumber} <br />
            </li>
            <li>
              <b>Types:</b>
              <ul>
                {selectedPokemon.types.map((item) => {
                  return <li>{item.type.name}</li>;
                })}
              </ul>
            </li>
            <li>
              <b>Moves({selectedPokemon.moves.length}):</b>
              <ul>
                {selectedPokemon.moves.map((item, index) => {
                  return (
                    <li
                      style={{
                        width: settings.screenWidth > 1300 ? "25%" : "100%",
                        display: "block",
                        float: "left",
                      }}
                    >
                      {index + 1}: {item.move.name}
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default connect(MapStateToProps)(DetailsCard);
