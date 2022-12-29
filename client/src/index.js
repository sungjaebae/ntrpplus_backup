import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ChannelService from "./components/ChannelService";
import ReactGA from "react-ga4";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Boot Channel as an anonymous user
ChannelService.boot({
  pluginKey: `${process.env.REACT_APP_CHANNEL_TALK_KEY}`, //please fill with your plugin key
});
ReactGA.initialize(`${process.env.REACT_APP_GA4}`);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
