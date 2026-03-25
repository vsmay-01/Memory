import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import { applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers/index";
import App from "./App"
import { BrowserRouter } from "react-router-dom";

const store = configureStore({reducer: reducers}, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root"));