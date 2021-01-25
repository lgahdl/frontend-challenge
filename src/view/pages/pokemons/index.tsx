import React, { useRef } from "react";
import { connect } from "react-redux";
import ListCard from "../../components/pokemons/ListCard";
import DetailsCard from "../../components/pokemons/DetailsCard";
import TopBar from "../../components/main/TopBar";
import BottomBar from "../../components/main/BottomBar";
import { Transition } from "react-transition-group";
import Scrollbar from "react-scrollbar";
import { Input } from "antd";

const { Search } = Input;

const defaultStyle = {
  transition: `opacity 300ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0.5 },
  entered: { opacity: 1 },
  exiting: { opacity: 0.5 },
  exited: { opacity: 0 },
};

const MapStateToProps = ({ pokemons, settings }) => ({
  pokemons: pokemons,
  settings,
});

const List = ({ pokemons, settings, dispatch }) => {
  if (settings.page != "pokemon") {
    dispatch({ type: "settings/SET_STATE", payload: { page: "pokemon" } });
  }
  const researchedPokemon = pokemons.researchedPokemon
    ? pokemons.researchedPokemon
    : null;
  const pagedPokemon = pokemons.pagedPokemon ? pokemons.pagedPokemon : null;
  const allPokemon = pokemons.allPokemon ? pokemons.allPokemon : null;
  const selectedPokemon = pokemons.selectedPokemon
    ? pokemons.selectedPokemon
    : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#6F88D9",
      }}
    >
      <TopBar />
      <div
        style={{
          display: "flex",
          flexDirection: settings.screenWidth > 700 ? "row" : "column-reverse",
          flex: 1,
          width: "100%",
          backgroundColor: "#6F88D9",
        }}
      >
        <Scrollbar
          speed={1}
          smoothScrolling
          className="area1"
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
          <div style={{ height: 60, paddingBottom: 20 }}>
            <Input
              placeholder="Search your Pokémon"
              onChange={(event) => {
                console.log(event);
                const researchString = event.currentTarget.value;
                dispatch({
                  type: "settings/SET_STATE",
                  payload: {
                    researchString,
                    search: researchString != "" ? true : false,
                  },
                });
                dispatch({ type: "pokemons/SEARCH" });
              }}
            />
          </div>
          {settings.search ? (
            <div>
              {researchedPokemon && researchedPokemon.results
                ? researchedPokemon.results.map((pokemon, index) => {
                    return (
                      <ListCard pokemon={pokemon} key={index} index={index} />
                    );
                  })
                : null}
            </div>
          ) : (
            <div>
              {pagedPokemon && pagedPokemon.results
                ? pagedPokemon.results.map((pokemon, index) => {
                    return (
                      <ListCard pokemon={pokemon} key={index} index={index} />
                    );
                  })
                : null}
            </div>
          )}
        </Scrollbar>
        <Scrollbar
          speed={1}
          smoothScrolling
          className="area2"
          contentClassName="content"
          horizontal={false}
          style={{
            flex: 3,
            height: 0.7 * window.innerHeight,
          }}
          contentStyle={{
            padding: 20,
          }}
        >
          <Transition
            in={selectedPokemon != null}
            unmountOnExit={true}
            duration={300}
          >
            {(state) => (
              <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                {selectedPokemon ? <DetailsCard /> : null}
              </div>
            )}
          </Transition>
        </Scrollbar>
      </div>
      <BottomBar lastPage={Math.ceil(allPokemon.count / 30)} />
    </div>
  );
};

export default connect(MapStateToProps)(List);
