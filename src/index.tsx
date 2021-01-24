import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";
import { createHashHistory, History } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { routerMiddleware } from "connected-react-router";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import sagas from "./redux/sagas";
import reducers from "./redux/reducers";
import Router from "./router";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";

const history: History = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];
// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }
const store = createStore(
  reducers(history),
  compose(applyMiddleware(...middlewares))
);
sagaMiddleware.run(sagas);

const windowResize = () => {
  return;
};

window.addEventListener("resize", () =>
  store.dispatch({
    type: "settings/SET_STATE",
    payload: {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    },
  })
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { store, history };
