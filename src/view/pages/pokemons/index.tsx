import React, { useRef } from "react";
import { connect } from "react-redux";
import ListCard from "../../components/pokemons/ListCard";
import DetailsCard from "../../components/pokemons/DetailsCard";
import BottomBar from "../../components/main/BottomBar";
import TopBar from "../../components/main/TopBar";
import { Transition } from "react-transition-group";
import Scrollbar from "react-perfect-scrollbar";
import { Input } from "antd";
import style from "./style.module.scss";

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
      className={style.body}
      style={{ height: settings.screenHeight > 1100 ? "100vh" : "100%" }}
    >
      <TopBar />

      {settings.screenWidth > 1100 ? (
        <div
          className={style.main_page}
          style={{
            display: "flex",
            flexDirection: "row",
            maxHeight: settings.screenHeight - 310,
          }}
        >
          <div style={{ flex: 3 }}>
            <Scrollbar
              style={{
                position: "relative",
                padding: 20,
                overflow: "hidden",
                height: settings.screenHeight - 310,
              }}
            >
              <div style={{ height: "100%" }}>
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
                            <ListCard
                              pokemon={pokemon}
                              key={index}
                              index={index}
                            />
                          );
                        })
                      : null}
                  </div>
                ) : (
                  <div>
                    {pagedPokemon && pagedPokemon.results
                      ? pagedPokemon.results.map((pokemon, index) => {
                          return (
                            <ListCard
                              pokemon={pokemon}
                              key={index}
                              index={index}
                            />
                          );
                        })
                      : null}
                  </div>
                )}
              </div>
            </Scrollbar>
          </div>
          <div style={{ flex: 7 }}>
            <Scrollbar
              style={{
                position: "relative",
                flex: 7,
                padding: 20,
                overflow: "hidden",
                height: settings.screenHeight - 310,
              }}
            >
              <div style={{ height: "100%" }}>
                {" "}
                <Transition
                  in={selectedPokemon != null}
                  unmountOnExit={true}
                  duration={300}
                >
                  {(state) => (
                    <div
                      style={{ ...defaultStyle, ...transitionStyles[state] }}
                    >
                      {selectedPokemon ? <DetailsCard /> : null}
                    </div>
                  )}
                </Transition>
              </div>
            </Scrollbar>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ padding: 20 }}>
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
          </div>
          <div style={{ height: "100%" }}>
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
          </div>
        </div>
      )}

      <BottomBar lastPage={Math.ceil(allPokemon.count / 30)} />
    </div>
  );
};

export default connect(MapStateToProps)(List);
