import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ChannelService from "./components/ChannelService";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Boot Channel as an anonymous user
ChannelService.boot({
  "pluginKey": `${process.env.REACT_APP_CHANNEL_TALK_KEY}` //please fill with your plugin key
});
console.log(process.env.REACT_APP_CHANNEL_TALK_KEY);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
