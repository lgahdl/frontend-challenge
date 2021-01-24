import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button } from "antd";

const MapStateToProps = ({ settings, pokemons }) => ({ settings, pokemons });

const BottomBar = ({
  settings,
  pokemons,
  dispatch,
  lastPage,
}) => {
  let firstPageToSelect: number =
    settings.selectedSubpage - 5 > 1
      ? settings.selectedSubpage - 5 < lastPage - 9
        ? settings.selectedSubpage - 5
        : lastPage - 9
      : 1;
  let pageButtons: any = [];
  for (let i = firstPageToSelect; i < firstPageToSelect + 10; i++) {
    pageButtons.push(
      <Button
        onClick={async () => {
          dispatch({
            type: "settings/SET_STATE",
            payload: { selectedSubpage: i },
          });
          dispatch({ type: "pokemons/LOAD_PAGED_POKEMONS" });
        }}
        key={i}
        style={{
          height: 40,
          padding: 10,
          width: 40,
          backgroundColor:
            settings.selectedSubpage == i ? "#FFCB05" : "#E1E2E1",
        }}
      >
        {i}
      </Button>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#6F88D9",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 60,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={async () => {
            dispatch({
              type: "settings/SET_STATE",
              payload: { selectedSubpage: 1 },
            });
            dispatch({ type: "pokemons/LOAD_PAGED_POKEMONS" });
          }}
          style={{
            height: 40,
            padding: 10,
            paddingLeft: 10,
            paddingRight: 10,
            width: 40,
            backgroundColor: "#E1E2E1",
          }}
        >
          {`<<`}
        </Button>
        {pageButtons}
        <Button
          onClick={async () => {
            dispatch({
              type: "settings/SET_STATE",
              payload: { selectedSubpage: lastPage },
            });
            dispatch({ type: "pokemons/LOAD_PAGED_POKEMONS" });
          }}
          style={{
            height: 40,
            padding: 10,
            paddingLeft: 10,
            paddingRight: 10,
            width: 40,
            backgroundColor: "#E1E2E1",
          }}
        >
          {`>>`}
        </Button>
      </div>
    </div>
  );
};

export default connect(MapStateToProps)(BottomBar);
