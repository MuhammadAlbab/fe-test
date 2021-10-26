import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Routes from "./routes";
import "./styles/base.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {Routes.map((route, index) => {
            return (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
