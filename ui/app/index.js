import "@babel/polyfill";

import "./styles/index.css";
import "./styles/tailwind.css";
import "./styles/map.css";
import "./styles/plugins/react-toastify.css";
import "./styles/plugins/react-datepicker.css";
import "./styles/plugins/react-dropzone-component.css";

import React from "react";
import { render } from "react-dom";
import App from "./app";

render(<App />, document.querySelector("#root"));
